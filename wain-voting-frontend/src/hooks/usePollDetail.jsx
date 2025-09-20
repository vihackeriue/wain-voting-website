import { useEffect, useState } from "react";
import { getPollById } from "../services/pollService";
import { useParams } from "react-router-dom";

export const usePollDetail = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);

  const [poll, setPoll] = useState(null);

  const [isPollEnded, setIsPollEnded] = useState(true); // Kiểm tra nếu cuộc bình chọn đã kết thúc
  const [isPollStarted, setIsPollStarted] = useState(true); // Kiểm tra nếu cuộc bình chọn đã bắt đầu
  useEffect(() => {
    const fechPollById = async () => {
      setLoading(true);
      try {
        const res = await getPollById(id);
        const data = res.data;

        setPoll(data);

        const currentTime = new Date();
        const pollEndTime = new Date(data.endTime);
        const pollStartTime = new Date(data.startTime);

        setIsPollEnded(currentTime > pollEndTime);
        setIsPollStarted(currentTime >= pollStartTime);
      } catch (error) {
        const errMsg =
          error.response?.data?.message || "Có lỗi xảy ra khi cập nhật ví!";
        alert(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fechPollById();
  }, [id]);

  return {
    loading,
    poll,
    isPollEnded,
    isPollStarted,
  };
};
