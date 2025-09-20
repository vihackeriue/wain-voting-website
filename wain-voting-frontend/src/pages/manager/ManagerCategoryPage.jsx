import React from "react";
import ManagerCategoryListSection from "../../components/sections/ManagerCategoryListSection";
import { useCategoryList } from "../../hooks/useCategoryList";

function ManagerCategoryPage() {
  const { loading, categories, page, totalPages, setPage } = useCategoryList();

  if (loading) return <p> Đang tải...</p>;

  return (
    <>
      <ManagerCategoryListSection
        categories={categories}
        pagination={{ page, totalPages, setPage }}
      />
    </>
  );
}

export default ManagerCategoryPage;
