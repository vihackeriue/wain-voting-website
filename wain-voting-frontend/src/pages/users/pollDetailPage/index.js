import React, { useEffect, useState, useCallback } from 'react';
import { Container, Row, Col, Modal, Button, Spinner, Alert, Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './style.css';
import { BrowserProvider, Contract, zeroPadValue } from 'ethers';
import { contractAbi, contractAddress } from '../../../constrants/constrant';
import { getWalletAddress } from '../../../utils/jwt';
import request from '../../../utils/request';

const PollDetailPage = () => {
    const { id } = useParams();
    const [poll, setPoll] = useState(null);
    const [pollResult, setPollResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [show, setShow] = useState(false);
    const [selectedCandidate, setSelectedCandidate] = useState(null);
    const [remainingVotes, setRemainingVotes] = useState(0);
    const [isPollEnded, setIsPollEnded] = useState(false); // Kiểm tra nếu cuộc bình chọn đã kết thúc
    const [isPollStarted, setIsPollStarted] = useState(false); // Kiểm tra nếu cuộc bình chọn đã bắt đầu

    const handleShow = (candidate) => {
        setSelectedCandidate(candidate);
        setShow(true);
    };

    const handleClose = () => {
        setShow(false);
        setSelectedCandidate(null);
    };

    const fetchRemainingVotes = useCallback(async () => {
        if (!window.ethereum) return;
        try {
            const provider = new BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const userAddress = await signer.getAddress();
            const contract = new Contract(contractAddress, contractAbi, provider);

            const token = localStorage.getItem("token");
            if (!token) {
                throw new Error("Không tìm thấy token đăng nhập. Vui lòng đăng nhập lại.");
            }
            const walletInToken = getWalletAddress();
            const walletInMetamask = userAddress.toLowerCase();

            if (walletInToken === "") {
                throw new Error("Bạn chưa kết nối tài khoản với ví");
            }
            if (walletInToken.toLowerCase() !== walletInMetamask) {
                throw new Error("Vui lòng đổi ví Metamask khớp với ví đã đăng ký!");
            }

            const bytesPollId = zeroPadValue(poll.chainId, 32);
            const votes = await contract.getRemainingVotes(bytesPollId, userAddress);

            setRemainingVotes(Number(votes));
        } catch (err) {
            console.error('Error fetching remaining votes:', err);
            alert(err);
        }
    }, [poll?.chainId]);

    useEffect(() => {
        const fetchPoll = async () => {
            setLoading(true);
            setError(null);
            try {
                const res = await request.get(`/poll/${id}`);
                const data = res.data;
                setPoll(data);

                // Kiểm tra nếu cuộc bình chọn đã kết thúc
                const currentTime = new Date();
                const pollEndTime = new Date(data.endTime);
                const pollStartTime = new Date(data.startTime);

                setIsPollEnded(currentTime > pollEndTime);
                setIsPollStarted(currentTime >= pollStartTime);
            } catch (err) {
                setError(err.response?.data?.message || err.message || 'Không thể lấy dữ liệu');
            } finally {
                setLoading(false);
            }
        };
        fetchPoll();
    }, [id]);

    useEffect(() => {
        if (poll) {
            fetchRemainingVotes();
            if (isPollEnded) {
                // Lấy kết quả bình chọn từ blockchain khi cuộc bình chọn đã kết thúc
                fetchPollResultFromBlockchain();
            }
        }
    }, [poll, fetchRemainingVotes, isPollEnded]);

    const fetchPollResultFromBlockchain = async () => {
        try {
            const provider = new BrowserProvider(window.ethereum);
            await provider.send("eth_requestAccounts", []);

            const contract = new Contract(contractAddress, contractAbi, provider);

            const bytesPollId = zeroPadValue(poll.chainId, 32);
            const result = await contract.getPollResult(bytesPollId);

            const [winnerId, highestVoteCount, totalVotes, candidateIds, voteCounts] = result;

            // Map các ứng viên từ kết quả Solidity
            const mappedCandidates = poll.candidates.map(candidate => {
                const candidateIndex = candidateIds.indexOf(candidate.id);
                return {
                    ...candidate,
                    voteCount: candidateIndex >= 0 ? voteCounts[candidateIndex] : 0, // Mặc định là 0 nếu không tìm thấy
                };
            });

            // Cập nhật kết quả cuộc bình chọn vào state
            setPollResult({
                winnerId,
                highestVoteCount: Number(highestVoteCount),
                totalVotes: Number(totalVotes),
                candidates: mappedCandidates,
            });
        } catch (err) {
            console.error(err);
            setError('Lỗi khi lấy kết quả bình chọn từ blockchain');
        }
    };

    const handleVote = async () => {
        try {
            if (!window.ethereum) {
                alert('Vui lòng cài đặt MetaMask!');
                return;
            }

            if (remainingVotes <= 0) {
                alert('Bạn đã hết lượt bình chọn!');
                return;
            }
            if (!isPollStarted) {
                alert('Cuộc bình chọn chưa bắt đầu!');
                return;
            }

            const provider = new BrowserProvider(window.ethereum);
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

            const tx = await contract.vote(poll.chainId, selectedCandidate.chainId, 1);
            await tx.wait();

            alert(`Bình chọn cho ${selectedCandidate.name} thành công!`);
            setShow(false);
            await fetchRemainingVotes(); // Cập nhật lại số lượt bình chọn còn lại sau khi vote
        } catch (error) {
            console.error(error);
            alert('Có lỗi xảy ra khi bình chọn!');
        }
    };

    if (loading) {
        return <div className="text-center py-5"><Spinner animation="border" /></div>;
    }

    if (error) {
        return <Alert variant="danger" className="my-4 text-center">{error}</Alert>;
    }

    return (
        <>
            {/* Section thông tin Poll */}
            <section className="about section py-5">
                <Container>
                    <Row className="align-items-center gy-4">
                        <Col lg={6} className="order-1 order-lg-2">
                            <img
                                src={poll.urlImage}
                                className="img-fluid rounded"
                                alt={poll.title}
                            />
                        </Col>
                        <Col lg={6} className="order-2 order-lg-1">
                            <h3 className="fw-bold" style={{ fontSize: '1.75rem' }}>{poll.title}</h3>
                            <p className="fst-italic text-muted">{poll.description}</p>
                            <ul className="list-unstyled">
                                <li><strong>Thời gian bắt đầu:</strong> {new Date(poll.startTime).toLocaleString()}</li>
                                <li><strong>Thời gian kết thúc:</strong> {new Date(poll.endTime).toLocaleString()}</li>
                                <li><strong>Số lượt bình chọn còn lại:</strong> {remainingVotes}</li>
                                <li><strong>Trạng thái:</strong> {poll.status === 1 ? "Công khai" : "Riêng tư"}</li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </section>

            {isPollEnded && (
                <center>
                    <Card className="shadow-sm h-100">
                        <Card.Body className="text-center">
                            <Card.Title className="fw-bold">
                                NGƯỜI THẮNG CUỘC
                            </Card.Title>
                            {pollResult?.candidates?.length > 0 && (
                                <>
                                    <img
                                        src={pollResult.candidates[0].urlImage}
                                        alt={pollResult.candidates[0].name}
                                        className="rounded-circle my-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <h5 className="fw-bold">{pollResult.candidates[0].name}</h5>
                                </>
                            )}
                        </Card.Body>
                    </Card>
                </center>
            )}



            {/* Section danh sách ứng viên */}
            <section className="py-5" id="candidates">
                <Container>
                    <center><h2 className="mb-4"><b>Danh sách các ứng viên</b></h2></center>
                    <Row className="gy-5">
                        {poll.candidates?.map((c) => (
                            <Col md={6} lg={4} key={c.id} className="text-center">
                                <div className="candidate-box position-relative">
                                    <div className="candidate-image-wrapper">
                                        <img
                                            src={c.urlImage}
                                            alt={c.name}
                                            className="img-fluid rounded-circle candidate-img"
                                        />
                                        {!isPollEnded && isPollStarted && (
                                            <button className="vote-button" onClick={() => handleShow(c)}>Chi tiết</button>
                                        )}
                                    </div>
                                    <h5 className="mt-3 mb-1 fw-bold">{c.name}</h5>
                                    <p className="fst-italic text-muted">Ứng viên</p>
                                </div>
                            </Col>
                        ))}
                    </Row>

                    {/* Modal cho chi tiết ứng viên */}
                    <Modal show={show} onHide={handleClose} centered>
                        {selectedCandidate && (
                            <>
                                <Modal.Header closeButton>
                                    <Modal.Title>{selectedCandidate.name}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body className="text-center">
                                    <img
                                        src={selectedCandidate.urlImage}
                                        alt={selectedCandidate.name}
                                        className="rounded-circle mb-3"
                                        style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                                    />
                                    <p>{selectedCandidate.description}</p>
                                </Modal.Body>
                                <Modal.Footer>
                                    {!isPollEnded && isPollStarted && (
                                        <Button
                                            variant="success"
                                            onClick={handleVote}
                                            disabled={remainingVotes <= 0}
                                        >
                                            {remainingVotes > 0 ? "Bình chọn" : "Hết lượt bình chọn"}
                                        </Button>
                                    )}
                                    <Button variant="secondary" onClick={handleClose}>Đóng</Button>
                                </Modal.Footer>
                            </>
                        )}
                    </Modal>
                </Container>
            </section>
        </>
    );
};

export default PollDetailPage;
