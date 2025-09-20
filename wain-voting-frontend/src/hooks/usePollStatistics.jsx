import { useEffect, useState } from "react";
import { getStatisticsPoll } from "../services/pollService";

export const usePollStatistics = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPolls: 0,
    upcomingPolls: 0,
    ongoingPolls: 0,
    finishedPolls: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const res = await getStatisticsPoll();
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching statistics:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  return { loading, stats };
};
