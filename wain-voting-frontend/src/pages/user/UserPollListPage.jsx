import React, { useState } from "react";

import UserPollListSection from "../../components/sections/UserPollListSection";
import { usePollList } from "../../hooks/usePollList";
import { useCategoryList } from "../../hooks/useCategoryList";

function UserPollListPage() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const { loading, polls, page, totalPages, setPage } =
    usePollList(selectedCategory);

  const { categories } = useCategoryList();

  if (loading) return <p> Đang tải...</p>;

  return (
    <>
      <UserPollListSection
        polls={polls}
        pagination={{ page, totalPages, setPage }}
        isPagination={true}
        categories={categories}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        isFilter={true}
      />
    </>
  );
}

export default UserPollListPage;
