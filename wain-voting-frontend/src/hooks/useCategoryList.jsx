import { useEffect, useState } from "react";
import { getCategories } from "../services/categoryService";

export const useCategoryList = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fechPolls = async () => {
      setLoading(true);
      try {
        const res = await getCategories(page);
        setCategories(res.data);
        setTotalPages(res.totalPages);
      } catch (error) {
        const errMsg =
          error.response?.data?.message ||
          "Có lỗi xảy ra khi lấy danh sách danh mục!";
        alert(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fechPolls();
  }, [page]);

  return { loading, categories, page, totalPages, setPage };
};
