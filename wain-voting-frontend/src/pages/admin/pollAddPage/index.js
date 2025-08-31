import { Contract, keccak256, toUtf8Bytes } from 'ethers';
import { BrowserProvider } from 'ethers';
import React, { useState } from 'react';
import { Form, Button, Col, Row, ProgressBar, Image } from 'react-bootstrap';
import { contractAbi, contractAddress } from '../../../constrants/constrant';
import { useNavigate } from 'react-router-dom';

import { getWalletAddress } from '../../../utils/jwt';
import request from '../../../utils/request';

const PollAddPage = () => {
    const [step, setStep] = useState(1);
    const initialState = {
        title: '',
        description: '',
        startDate: '',
        endDate: '',
        status: 'active',
        maxVotesPerVoter: '',
        image: '',
        candidates: [
            { name: '', description: '', image: '' },
            { name: '', description: '', image: '' }
        ]
    };
    const navigate = useNavigate();

    const [poll, setPoll] = useState(initialState);

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setPoll({ ...poll, [e.target.name]: e.target.value });
    };


    const handleCandidateChange = (index, field, value) => {
        const updatedCandidates = [...poll.candidates];
        updatedCandidates[index][field] = value;
        setPoll({ ...poll, candidates: updatedCandidates });
    };

    const addCandidate = () => {
        setPoll({ ...poll, candidates: [...poll.candidates, { name: '', description: '', image: '' }] });
    };


    const validateStep1 = () => {
        const newErrors = {};
        if (!poll.title.trim()) newErrors.title = 'Vui lòng nhập tiêu đề';
        if (!poll.description.trim()) newErrors.description = 'Vui lòng nhập mô tả';
        if (!poll.startDate) newErrors.startDate = 'Chọn ngày bắt đầu';
        if (!poll.endDate) newErrors.endDate = 'Chọn ngày kết thúc';
        if (!poll.maxVotesPerVoter || isNaN(poll.maxVotesPerVoter)) newErrors.maxVotesPerVoter = 'Vui lòng nhập số phiếu tối đa';
        if (!poll.image) newErrors.image = 'Vui lòng chọn hình ảnh';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    const validateStep2 = () => {
        const newErrors = {};
        poll.candidates.forEach((c, i) => {
            if (!c.name.trim()) newErrors[`name${i}`] = 'Tên không được để trống';
            if (!c.description.trim()) newErrors[`desc${i}`] = 'Mô tả không được để trống';

            if (!c.image) newErrors[`img${i}`] = 'Ảnh không được để trống';
        });
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNextStep = () => {
        if (step === 1 && validateStep1()) setStep(2);
        else if (step === 2 && validateStep2()) setStep(3);
    };


    // Lưu thông tin

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            file.preview = imageUrl;
            poll.image = file;
            setPoll({ ...poll });
        }
    };

    const handleCandidateImageChange = (index, file) => {
        const updatedCandidates = [...poll.candidates];
        file.preview = URL.createObjectURL(file);
        updatedCandidates[index].image = file;
        setPoll({ ...poll, candidates: updatedCandidates });
    };

    const uploadFileToLocalIPFS = async (file) => {
        console.log(" Đang submit...uploadFileToLocalIPFS");
        const formData = new FormData();
        formData.append('file', file);

        const res = await fetch('http://localhost:5002/api/v0/add', {
            method: 'POST',
            body: formData
        });
        const data = await res.text();
        const cid = data.match(/Hash":\s*"(.*?)"/)[1];
        console.log("uploadFileToLocalIPFS thành công: http://localhost:8082/ipfs/" + cid);
        return `http://localhost:8082/ipfs/${cid}`;
    };

    const uploadJSONToLocalIPFS = async (obj) => {
        const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' });
        const file = new File([blob], 'data.json');
        return await uploadFileToLocalIPFS(file);
    };

    const handleSubmit = async () => {
        try {
            // Kết nối Metamask & Smart Contract
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = await provider.getSigner();
            const contract = new Contract(contractAddress, contractAbi, signer);
            const address = await signer.getAddress();

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.");
            }
            const walletInToken = getWalletAddress();
            const walletInMetamask = address.toLowerCase();

            if (walletInToken === "") {

                throw new Error("Bạn chưa kết nối tài khoản với ví");
            }
            if (walletInToken.toLowerCase() !== walletInMetamask) {

                throw new Error("Vui lòng đổi ví Metamask khớp với ví đã đăng ký!");
            }
            // Upload hình ảnh chính lên IPFS
            const pollImageUrl = await uploadFileToLocalIPFS(poll.image);

            // Upload ảnh từng ứng viên lên IPFS
            const candidateWithUrls = await Promise.all(
                poll.candidates.map(async (c) => ({
                    ...c,
                    image: await uploadFileToLocalIPFS(c.image)
                }))
            );

            // Tạo dữ liệu poll để upload lên IPFS

            const pollDataWithUrls = {
                title: poll.title,
                description: poll.description,
                image: pollImageUrl,
                creator: address
            };

            // Upload dữ liệu poll lên IPFS
            const pollCIDUrl = await uploadJSONToLocalIPFS(pollDataWithUrls);

            // 🔥 Tạo pollId duy nhất bằng keccak256 (hash UUID)
            const pollId = keccak256(toUtf8Bytes(crypto.randomUUID()));

            console.log("🛠 Tạo cuộc bình chọn trên blockchain... maxVotesPerVoter", poll.maxVotesPerVoter);
            const tx1 = await contract.createPoll(pollId, Number(poll.maxVotesPerVoter), pollCIDUrl);
            await tx1.wait();

            console.log("📁 Upload ứng viên lên IPFS...");
            const candidateCIDs = await Promise.all(
                candidateWithUrls.map((c) => uploadJSONToLocalIPFS(c))
            );

            // 🔥 Tạo candidateId duy nhất cho từng ứng viên
            const candidateIds = candidateCIDs.map(() => keccak256(toUtf8Bytes(crypto.randomUUID())));

            console.log(" Thêm ứng viên vào blockchain...");
            const tx2 = await contract.addCandidatesToPoll(pollId, candidateIds, candidateCIDs);
            await tx2.wait();
            console.log("✅ Blockchain hoàn tất");
            // Gọi API lưu vào database
            const startDate_new = poll.startDate + ":00";
            const endDate_new = poll.endDate + ":00";
            const response = await request.post(
                "/poll/create-poll",
                {
                    title: poll.title,
                    description: poll.description,
                    startTime: startDate_new,
                    endTime: endDate_new,
                    categoryId: 1,
                    status: poll.status,
                    urlImage: pollImageUrl,
                    chainId: pollId,
                    creatorId: 1, // cân nhắc xử lý động
                    candidates: candidateWithUrls.map((c, i) => ({
                        name: c.name,
                        description: c.description,
                        urlImage: c.image,
                        chainId: candidateIds[i],
                    }))
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            );
            console.log("✅ Lưu DB thành công:", response.data);
            alert("🎉 Tạo cuộc bình chọn thành công!");
            setPoll(initialState);
            setStep(1);
            navigate('/manager/poll-list');

        } catch (err) {
            console.error("Lỗi khi tạo cuộc bình chọn:", err);

            if (err.response) {
                console.error("Chi tiết lỗi:", err.response.data);
                alert(`Lỗi từ server: ${JSON.stringify(err.response.data)}`);
            } else {
                alert(err.message || "Đã xảy ra lỗi khi tạo cuộc bình chọn!");
            }
        }
    };


    return (
        <div className="mt-4 mx-auto px-3">

            <ProgressBar
                now={(step / 3) * 100}
                className="mb-4"
                style={{ height: '4px' }}
                variant="warning"
            />

            {step === 1 && (
                <>
                    <h4 className="mb-4"><b>Thông tin cuộc bình chọn</b></h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control size="sm" name="title" value={poll.title} onChange={handleChange} isInvalid={!!errors.title} required />
                        <Form.Control.Feedback type="invalid">{errors.title}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" size="sm" name="description" rows={3} value={poll.description} onChange={handleChange} isInvalid={!!errors.description} />
                        <Form.Control.Feedback type="invalid">{errors.description}</Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số phiếu tối đa mỗi người</Form.Label>
                        <Form.Control size="sm" type="number" name="maxVotesPerVoter" value={poll.maxVotesPerVoter} onChange={handleChange} isInvalid={!!errors.maxVotesPerVoter} />
                        <Form.Control.Feedback type="invalid">{errors.maxVotesPerVoter}</Form.Control.Feedback>
                    </Form.Group>
                    <Row>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ngày bắt đầu</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="datetime-local"
                                    name="startDate"
                                    value={poll.startDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.startDate}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.startDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                        <Col md={6}>
                            <Form.Group className="mb-3">
                                <Form.Label>Ngày kết thúc</Form.Label>
                                <Form.Control
                                    size="sm"
                                    type="datetime-local"
                                    name="endDate"
                                    value={poll.endDate}
                                    onChange={handleChange}
                                    isInvalid={!!errors.endDate}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors.endDate}</Form.Control.Feedback>
                            </Form.Group>
                        </Col>
                    </Row>
                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Select size="sm" name="status" value={poll.status} onChange={handleChange}>
                            <option value="0">Riêng tư</option>
                            <option value="1">Công khai</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Hình ảnh</Form.Label>
                        <Form.Control size="sm" type="file" onChange={handleImageChange} isInvalid={!!errors.image} />
                        {poll.image?.preview && <Image src={poll.image.preview} height={60} className="mt-2" rounded />}
                        <Form.Control.Feedback type="invalid">{errors.image}</Form.Control.Feedback>
                    </Form.Group>
                    <div className="text-end">
                        <Button size="sm" variant="primary" onClick={handleNextStep}>Tiếp theo</Button>
                    </div>
                </>
            )}

            {step === 2 && (
                <>
                    <h4 className="mb-4"><b>Thông tin ứng viên</b></h4>
                    {poll.candidates.map((candidate, index) => (
                        <div key={index} className="mb-3 p-3 border rounded">
                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <Form.Label className="mb-0">Tên ứng viên {index + 1}</Form.Label>
                                {poll.candidates.length > 1 && (
                                    <Button size="sm" variant="danger" onClick={() => {
                                        const updated = poll.candidates.filter((_, i) => i !== index);
                                        setPoll({ ...poll, candidates: updated });
                                    }}>
                                        Xóa
                                    </Button>
                                )}
                            </div>
                            <Form.Group className="mb-2">
                                <Form.Control
                                    size="sm"
                                    value={candidate.name}
                                    onChange={(e) => handleCandidateChange(index, 'name', e.target.value)}
                                    isInvalid={!!errors[`name${index}`]}
                                    required
                                />
                                <Form.Control.Feedback type="invalid">{errors[`name${index}`]}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Mô tả</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    size="sm"
                                    rows={2}
                                    value={candidate.description}
                                    onChange={(e) => handleCandidateChange(index, 'description', e.target.value)}
                                    isInvalid={!!errors[`desc${index}`]}
                                />
                                <Form.Control.Feedback type="invalid">{errors[`desc${index}`]}</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Label>Ảnh ứng viên</Form.Label>
                                <Form.Control size="sm" type="file" onChange={(e) => handleCandidateImageChange(index, e.target.files[0])} isInvalid={!!errors[`img${index}`]} />
                                {candidate.image?.preview && <Image src={candidate.image.preview} height={40} rounded />}
                                <Form.Control.Feedback type="invalid">{errors[`img${index}`]}</Form.Control.Feedback>
                            </Form.Group>
                        </div>
                    ))}
                    <div className="text-end">
                        <Button size="sm" variant="outline-secondary" onClick={addCandidate} className="me-2">+ Thêm ứng viên</Button>
                        <Button size="sm" variant="secondary" onClick={() => setStep(1)} className="me-2">Quay lại</Button>
                        <Button size="sm" variant="primary" onClick={handleNextStep}>Tiếp theo</Button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <h4 className="mb-4">Xác nhận thông tin</h4>
                    <Form.Group className="mb-3">
                        <Form.Label>Tiêu đề</Form.Label>
                        <Form.Control size="sm" type="text" value={poll.title} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Mô tả</Form.Label>
                        <Form.Control as="textarea" rows={2} size="sm" value={poll.description} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Thời gian</Form.Label>
                        <Form.Control size="sm" type="text" value={`${poll.startDate} đến ${poll.endDate}`} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Số phiếu tối đa mỗi người</Form.Label>
                        <Form.Control size="sm" type="text" value={poll.maxVotesPerVoter} readOnly />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Trạng thái</Form.Label>
                        <Form.Control size="sm" type="text" value={poll.status} readOnly />
                    </Form.Group>
                    {poll.image?.preview && <Image src={poll.image.preview} height={60} className="mt-2" rounded />}

                    <h5 className="mt-3">Danh sách ứng viên:</h5>
                    <div className="table-responsive">
                        <table className="table table-bordered table-sm">
                            <thead className="table-light">
                                <tr>
                                    <th>#</th>
                                    <th>Tên</th>
                                    <th>Mô tả</th>
                                    <th>Ảnh</th>
                                </tr>
                            </thead>
                            <tbody>
                                {poll.candidates.map((c, i) => (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{c.name}</td>
                                        <td>{c.description}</td>
                                        <td>{c.image?.preview && <Image src={c.image.preview} height={40} rounded />} </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="text-end">
                        <Button size="sm" variant="secondary" onClick={() => setStep(2)} className="me-2">Quay lại</Button>
                        <Button size="sm" variant="success" onClick={handleSubmit}>Tạo cuộc bình chọn</Button>
                    </div>
                </>
            )}
        </div>
    );
};

export default PollAddPage;