import React from "react";
import ManagerUserListSection from "../../components/sections/ManagerUserListSection";
import { useUserList } from "../../hooks/useUserList";

function ManagerUserListPage() {
  const { loading, users, page, totalPages, setPage } = useUserList();
  if (loading) return <p> Đang tải...</p>;
  return (
    <>
      <ManagerUserListSection
        users={users}
        pagination={{ page, totalPages, setPage }}
      />
    </>
  );
}

export default ManagerUserListPage;
