import React from "react";
import ManagerHomeSection from "../../components/sections/ManagerHomeSection";
import { usePollStatistics } from "../../hooks/usePollStatistics";
import { usePollUpcoming } from "../../hooks/usePollUpcoming";

function ManagerHomePage() {
  const { loading: loadingStats, stats } = usePollStatistics();
  const { loading: loadingUpcoming, polls } = usePollUpcoming();

  if (loadingStats && loadingUpcoming) return <p> Đang tải...</p>;
  console.log(stats);
  return (
    <>
      <ManagerHomeSection stats={stats} polls={polls} />
    </>
  );
}

export default ManagerHomePage;
