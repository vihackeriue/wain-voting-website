import { useEffect, useState } from "react";
import { getUsers } from "../services/userService";

export const useUserList = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fechUsers = async () => {
      setLoading(true);
      try {
        const res = await getUsers(page);
        setUsers(res.data);
        setTotalPages(res.totalPages);
      } catch (error) {
        const errMsg =
          error.response?.data?.message ||
          "Có lỗi xảy ra lấy danh sách người dùng!";
        alert(errMsg);
      } finally {
        setLoading(false);
      }
    };

    fechUsers();
  }, [page]);

  return { loading, users, page, totalPages, setPage };
};
