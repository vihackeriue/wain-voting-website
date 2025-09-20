import { useEffect, useState } from "react";
import { getCategoriesNotPage } from "../services/categoryService";

export const useCategoryNotPageList = () => {
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const res = await getCategoriesNotPage(); // gọi API không phân trang
        setCategories(res.data);
      } catch (error) {
        const errMsg =
          error.response?.data?.message ||
          "Có lỗi xảy ra khi lấy danh sách danh mục!";
        alert(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { loading, categories };
};
