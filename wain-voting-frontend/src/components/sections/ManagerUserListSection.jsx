import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../ui/button/PrimaryButton";
import PrimaryPagination from "../ui/pagination/PrimaryPagination";

function ManagerUserListSection({ users, pagination }) {
  const navigate = useNavigate();
  return (
    <div className="container bg-dark-100 rounded-2xl shadow-md border border-dark-50">
      <div className="flex items-center justify-between my-3 p-3 rounded-xl  text-secondary-900">
        <h1 className="text-3xl font-semibold">
          Danh sách người dùng hệ thống
        </h1>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-dark-100 bg-secondary-700 rounded-2xl">
          <thead className="text-xs  uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                username
              </th>
              <th scope="col" className="px-6 py-3">
                email
              </th>
              <th scope="col" className="px-6 py-3">
                fullName
              </th>
              <th scope="col" className="px-6 py-3">
                phone
              </th>
              <th scope="col" className="px-6 py-3">
                Trang thái
              </th>
              <th scope="col" className="px-6 py-3">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="border-b bg-secondary-900 text-dark-100">
            {users.map((user, index) => (
              <tr
                className="hover:bg-secondary-700"
                onClick={() => navigate(`/manager/user-detail/${user.id}`)}
              >
                <td className="text-center">{index + 1}</td>
                <td className="text-center">{user.username}</td>

                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.fullName}</td>
                <td className="px-6 py-4">{user.phone}</td>
                <td className="px-6 py-4">Đang hoạt động</td>
                <td className="px-6 py-4">
                  <PrimaryButton>Khóa tài khoản</PrimaryButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="hidden md:block mt-3">
          <div className="flex justify-center mb-8 ">
            <PrimaryPagination pagination={pagination} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerUserListSection;
