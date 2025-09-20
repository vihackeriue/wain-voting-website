import React from "react";
import ManagerPollListSection from "../../components/sections/ManagerPollListSection";
import { usePollList } from "../../hooks/usePollList";

function ManagerPollListPage() {
  const { loading, polls, page, totalPages, setPage } = usePollList();

  if (loading) return <p> Đang tải...</p>;

  return (
    <>
      <ManagerPollListSection
        polls={polls}
        pagination={{ page, totalPages, setPage }}
      />
    </>
  );
}

export default ManagerPollListPage;
