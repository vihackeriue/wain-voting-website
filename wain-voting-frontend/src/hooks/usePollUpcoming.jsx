import { useEffect, useState } from "react";
import { getUpcomingPolls } from "../services/pollService";

export const usePollUpcoming = () => {
  const [loading, setLoading] = useState(true);
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    const fetchPolls = async () => {
      setLoading(true);
      try {
        const res = await getUpcomingPolls();
        setPolls(res.data || []);
      } catch (error) {
        console.error("Lỗi khi lấy poll sắp tới:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPolls();
  }, []);

  return { loading, polls };
};
