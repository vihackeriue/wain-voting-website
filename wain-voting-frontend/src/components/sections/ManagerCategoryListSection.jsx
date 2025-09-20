import React from "react";
import { useNavigate } from "react-router-dom";
import PrimaryButton from "../ui/button/PrimaryButton";
import PrimaryPagination from "../ui/pagination/PrimaryPagination";

function ManagerCategoryListSection({ categories, pagination }) {
  const navigate = useNavigate();

  return (
    <div className="container bg-dark-100 rounded-2xl shadow-md border border-dark-50">
      <div className="flex items-center justify-between my-3 p-3 rounded-xl  text-secondary-900">
        <h1 className="text-3xl font-semibold">Danh sách danh mục</h1>
        <PrimaryButton onClick={() => navigate("/manager/poll-create")}>
          Thêm danh mục
        </PrimaryButton>
      </div>
      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-dark-100 bg-secondary-700 rounded-2xl">
          <thead className="text-xs  uppercase ">
            <tr>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                #
              </th>
              <th scope="col" className="px-6 py-3">
                Tên danh mục
              </th>
              <th scope="col" className="px-6 py-3">
                Mô tả
              </th>
            </tr>
          </thead>
          <tbody className="border-b bg-secondary-900 text-dark-100">
            {categories.map((category) => (
              <tr
                className="hover:bg-secondary-700"
                onClick={() => navigate(`/manager/poll-detail/${category.id}`)}
              >
                <td className="text-center">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="size-16 p-2 rounded-xl"
                  />
                </td>
                <td className="text-center">{category.id}</td>

                <td className="px-6 py-4">{category.name}</td>
                <td className="px-6 py-4">{category.description}</td>
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

export default ManagerCategoryListSection;
