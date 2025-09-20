import { useEffect, useState } from "react";
import { getPolls } from "../services/pollService";

export const usePollList = (categoryId) => {
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fechPolls = async () => {
      setLoading(true);
      try {
        const res = await getPolls(page, undefined, categoryId);
        setPolls(res.data);
        setTotalPages(res.totalPages);
      } catch (error) {
        const errMsg =
          error.response?.data?.message ||
          "Có lỗi xảy ra lấy danh sách bình chọn!";
        alert(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fechPolls();
  }, [page, categoryId]);

  return { loading, polls, page, totalPages, setPage };
};
