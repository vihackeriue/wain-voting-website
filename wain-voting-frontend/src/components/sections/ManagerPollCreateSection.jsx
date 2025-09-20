import React, { useState } from "react";
import InputValue from "../ui/form/InputValue";
import { FaImages } from "react-icons/fa";
import PrimaryButton from "../ui/button/PrimaryButton";
import { HiOutlineTrash } from "react-icons/hi";
import { getBlockchainSign } from "../../utils/wallet";
import useAuth from "../../hooks/useAuth";
import { keccak256, toUtf8Bytes } from "ethers";
import { createPoll } from "../../services/pollService";
import { useNavigate } from "react-router-dom";

import { useCategoryNotPageList } from "../../hooks/useCategoryNotPageList";

function ManagerPollCreateSection() {
  const initialState = {
    title: "",
    description: "",
    startDate: "",
    endDate: "",
    status: "ACTIVE",
    maxVotesPerVoter: "",
    category: "",
    image: "",
    candidates: [],
  };
  const [poll, setPoll] = useState(initialState);
  const { loading, categories } = useCategoryNotPageList();
  const [step, setStep] = useState(1);
  const { auth } = useAuth();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState({
    name: "",
    description: "",
    image: "",
  });
  console.log("auth", auth);
  // poll
  const handlePollChange = (e) => {
    setPoll({ ...poll, [e.target.name]: e.target.value });
  };
  const handlePollImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      file.preview = imageUrl;
      poll.image = file;
      setPoll({ ...poll });
    }
  };

  const handleNextStep = (e) => {
    e.preventDefault();
    if (
      !poll.title ||
      !poll.startDate ||
      !poll.endDate ||
      !poll.image ||
      !poll.category
    ) {
      alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
      return;
    }
    setStep(2);
  };

  // --- Candidate handlers ---
  const handleCandidateChange = (e) => {
    setCandidate({ ...candidate, [e.target.name]: e.target.value });
  };

  const handleCandidateImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      file.preview = imageUrl;
      setCandidate({ ...candidate, image: file });
    }
  };
  const uploadFileToLocalIPFS = async (file) => {
    console.log(" Đang submit...uploadFileToLocalIPFS");
    const formData = new FormData();
    formData.append("file", file);

    const res = await fetch("http://localhost:5001/api/v0/add", {
      method: "POST",
      body: formData,
    });
    const data = await res.text();
    const cid = data.match(/Hash":\s*"(.*?)"/)[1];
    console.log(
      "uploadFileToLocalIPFS thành công: http://localhost:8081/ipfs/" + cid
    );
    return `http://localhost:8081/ipfs/${cid}`;
  };

  const uploadJSONToLocalIPFS = async (obj) => {
    const blob = new Blob([JSON.stringify(obj)], { type: "application/json" });
    const file = new File([blob], "data.json");
    return await uploadFileToLocalIPFS(file);
  };

  const addCandidate = () => {
    if (!candidate.name || !candidate.description || !candidate.image) {
      alert("Vui lòng đầy đủ thông tin ứng viên!");
      return;
    }
    setPoll({ ...poll, candidates: [...poll.candidates, candidate] });
    setCandidate({ name: "", description: "", image: "" });
  };

  const removeCandidate = (index) => {
    const newCandidates = poll.candidates.filter((_, i) => i !== index);
    setPoll({ ...poll, candidates: newCandidates });
  };

  // handle create poll
  const handleCreatePoll = async () => {
    try {
      const { contract, userAddress } = await getBlockchainSign(
        auth.walletAddress
      );
      // Upload hình ảnh chính lên IPFS
      const pollImageUrl = await uploadFileToLocalIPFS(poll.image);

      // Upload ảnh từng ứng viên lên IPFS
      const candidateWithUrls = await Promise.all(
        poll.candidates.map(async (c) => ({
          ...c,
          image: await uploadFileToLocalIPFS(c.image),
        }))
      );

      const pollDataWithUrls = {
        title: poll.title,
        image: pollImageUrl,
        creator: userAddress,
      };

      // Upload dữ liệu poll lên IPFS
      const pollCIDUrl = await uploadJSONToLocalIPFS(pollDataWithUrls);

      // 🔥 Tạo pollId duy nhất bằng keccak256 (hash UUID)
      const pollId = keccak256(toUtf8Bytes(crypto.randomUUID()));

      // Upload candidate metadata lên IPFS
      const candidateCIDs = await Promise.all(
        candidateWithUrls.map((c) => uploadJSONToLocalIPFS(c))
      );
      // CandidateId cho từng ứng viên
      const candidateIds = candidateCIDs.map(() =>
        keccak256(toUtf8Bytes(crypto.randomUUID()))
      );

      console.log("🛠 Gọi createPollWithCandidates...");

      const tx = await contract.createPollWithCandidates(
        pollId,
        Number(poll.maxVotesPerVoter),
        pollCIDUrl,
        candidateIds,
        candidateCIDs
      );
      console.log("📌 Tx object:", tx);
      const receipt = await tx.wait();
      console.log("✅ Transaction mined:", receipt);
      console.log("✅ Blockchain hoàn tất");

      const startDate_new = poll.startDate + ":00";
      const endDate_new = poll.endDate + ":00";

      const request = {
        title: poll.title,
        description: poll.description,
        startTime: startDate_new,
        endTime: endDate_new,
        categoryId: 2,
        status: poll.status,
        image: pollImageUrl,
        chainId: pollId,
        candidates: candidateWithUrls.map((c, i) => ({
          name: c.name,
          description: c.description,
          image: c.image,
          chainId: candidateIds[i],
        })),
      };

      const response = await createPoll(request);
      console.log("✅ Lưu DB thành công:", response.data);
      navigate("/manager/poll-list");
    } catch (err) {
      console.error("Lỗi khi tạo cuộc bình chọn:", err);
      alert(err.reason || err.message || "Giao dịch thất bại!");
    }
  };
  if (loading) return <p> Đang tải...</p>;
  return (
    <div>
      {/* Progress bar */}

      <div className=" flex gap-8">
        {/* --- Bước 1: Thông tin poll --- */}
        <div className="flex-1 bg-dark-100 text-secondary-900 px-3 py-5 rounded-xl shadow-md">
          <div className="h-1 w-full bg-secondary-700 my-3">
            <div
              className="h-1 bg-primary transition-all"
              style={{ width: step === 1 ? "45%" : "100%" }}
            ></div>
          </div>
          {step === 1 && (
            <section>
              <h1 className="text-2xl mb-6 text-primary font-semibold">
                Thông tin cuộc bình chọn
              </h1>
              <form className="space-y-2" onSubmit={handleNextStep}>
                <InputValue
                  name="title"
                  value={poll.title}
                  onChange={handlePollChange}
                >
                  Tên cuộc bình chọn
                </InputValue>

                <div>
                  <label className="block text-sm font-medium p-2">Mô tả</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={poll.description}
                    onChange={handlePollChange}
                    className="mt-1 block w-full border px-3 py-2 rounded-md bg-dark-100 border-dark-50"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <InputValue
                    type={"datetime-local"}
                    name="startDate"
                    value={poll.startDate}
                    onChange={handlePollChange}
                  >
                    Ngày bắt đầu
                  </InputValue>
                  <InputValue
                    type={"datetime-local"}
                    name="endDate"
                    value={poll.endDate}
                    onChange={handlePollChange}
                  >
                    Ngày kết thúc
                  </InputValue>
                </div>

                <InputValue
                  type={"number"}
                  value={poll.maxVotesPerVoter}
                  name="maxVotesPerVoter"
                  onChange={handlePollChange}
                >
                  Số phiếu tối đa
                </InputValue>
                <div>
                  <label className="block text-sm font-medium p-2">
                    Danh mục
                  </label>

                  <select
                    className="w-full px-3 py-2 rounded-lg border border-dark-50 bg-dark-100ư 
             focus:outline-none 
             text-gray-700"
                    name="category"
                    onChange={handlePollChange}
                    value={poll.category}
                  >
                    <option>Danh mục...</option>
                    {categories.map((category) => (
                      <option value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div className="flex justify-between items-center">
                  <InputValue type="file" onChange={handlePollImageChange}>
                    Hình ảnh
                  </InputValue>
                  {!poll?.image?.preview ? (
                    <FaImages className="size-20" />
                  ) : (
                    <img
                      src={poll.image?.preview}
                      alt=""
                      className="size-20 rounded-xl"
                    />
                  )}
                </div>
                <div className="flex justify-end mt-3">
                  <PrimaryButton>Tiếp theo</PrimaryButton>
                </div>
              </form>
            </section>
          )}
          {/* --- Bước 2: Thông tin ứng viên --- */}
          {step === 2 && (
            <section>
              <div className="">
                <h1 className="text-2xl mb-6 text-primary font-semibold">
                  Thông tin ứng viên
                </h1>

                <div className="space-y-2">
                  <InputValue
                    value={candidate.name}
                    name="name"
                    onChange={handleCandidateChange}
                  >
                    Tên ứng viên
                  </InputValue>

                  <div>
                    <label className="block text-sm font-medium p-2">
                      Mô tả
                    </label>
                    <textarea
                      rows={3}
                      name="description"
                      value={candidate.description}
                      onChange={handleCandidateChange}
                      className="mt-1 block w-full border px-3 py-2 rounded-md bg-dark-100 border-dark-50"
                    />
                  </div>

                  <div className="flex justify-between items-center">
                    <InputValue
                      type="file"
                      onChange={handleCandidateImageChange}
                    >
                      Hình ảnh ứng viên
                    </InputValue>
                    {!candidate?.image?.preview ? (
                      <FaImages className="size-20" />
                    ) : (
                      <img
                        src={candidate.image.preview}
                        alt=""
                        className="size-20 rounded-xl"
                      />
                    )}
                  </div>
                </div>

                <div className="flex justify-end mt-3 gap-2">
                  <PrimaryButton onClick={() => setStep(1)}>
                    Quay lại
                  </PrimaryButton>
                  <PrimaryButton onClick={addCandidate}>
                    Thêm ứng viên
                  </PrimaryButton>
                </div>
              </div>
            </section>
          )}
        </div>
        {/* Xác nhận thông tin poll + candidates */}
        <div className="flex-1 bg-dark-100 text-secondary-900 px-3 py-5 rounded-xl shadow-md">
          <h2 className="text-xl mb-3 text-primary font-semibold">
            Xác nhận thông tin
          </h2>
          <div className="space-y-4  rounded-md ">
            <div className="bg-dark-900 rounded-xl p-4 space-y-3 ">
              <div className="flex items-start justify-between">
                {poll?.image?.preview && (
                  <img
                    src={poll.image.preview}
                    alt="poll"
                    className="mt-2 w-40 rounded"
                  />
                )}
                <div>
                  <p>
                    <b>Thời gian bắt đầu:</b> {poll.startDate}
                  </p>
                  <p>
                    <b>Thời gian kết thúc:</b> {poll.endDate}
                  </p>
                  <p>
                    <b>Danh mục:</b> {poll.category}
                  </p>
                </div>
              </div>
              <p>
                <b>Tên cuộc bình chọn:</b> {poll.title}
              </p>
              <p className=" line-clamp-2">
                <b>Mô tả:</b> {poll.description}
              </p>
            </div>

            <div className="p-4">
              <h3 className="text-xl mb-2 text-primary font-semibold">
                Danh sách ứng viên
              </h3>
              {poll.candidates.length === 0 && (
                <p className="text-secondary-700">Chưa có ứng viên nào.</p>
              )}
              <ul className="space-y-2 max-h-64 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
                {poll.candidates.map((c, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between bg-dark-900 p-5 rounded"
                  >
                    <div className="max-w-[200px]">
                      <p className="truncate">
                        <b>{c.name}</b>
                      </p>
                      <p className="text-sm text-secondary-700 line-clamp-2">
                        {c.description}
                      </p>
                    </div>
                    <div className="flex items-center gap-3">
                      {c?.image?.preview && (
                        <img
                          src={c.image.preview}
                          alt=""
                          className="w-12 h-12 rounded"
                        />
                      )}
                      <button
                        onClick={() => removeCandidate(i)}
                        className="text-red-400 hover:text-red-600 text-xl"
                      >
                        <HiOutlineTrash />
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            {poll.candidates.length >= 1 && (
              <PrimaryButton onClick={handleCreatePoll}>
                Tạo Cuộc bình chọn
              </PrimaryButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerPollCreateSection;
