import React from "react";
import { useNavigate } from "react-router-dom";

import PrimaryButton from "../ui/button/PrimaryButton";
import PrimaryPagination from "../ui/pagination/PrimaryPagination";
import { statusPoll } from "../../utils/poll";

function ManagerPollListSection({ polls, pagination }) {
  const navigate = useNavigate();

  return (
    <div className="container bg-dark-100 rounded-2xl shadow-md border border-dark-50">
      <div className="flex items-center justify-between my-3 p-3 rounded-xl  text-secondary-900">
        <h1 className="text-3xl font-semibold">Danh sách cuộc bình chọn</h1>
        <PrimaryButton onClick={() => navigate("/manager/poll-create")}>
          Thêm cuộc bình chọn
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
                Tiêu đề
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian bắt đầu
              </th>
              <th scope="col" className="px-6 py-3">
                Thời gian kết thúc
              </th>
              <th scope="col" className="px-6 py-3">
                Danh mục
              </th>
              <th scope="col" className="px-6 py-3">
                Trang thái
              </th>
            </tr>
          </thead>
          <tbody className="border-b bg-secondary-900 text-dark-100">
            {polls.map((poll) => (
              <tr
                className="hover:bg-secondary-700"
                onClick={() => navigate(`/manager/poll-detail/${poll.id}`)}
              >
                <td className="text-center">{poll.id}</td>

                <td className="px-6 py-4">{poll.title}</td>
                <td className="px-6 py-4">{poll.startTime}</td>
                <td className="px-6 py-4">{poll.endTime}</td>
                <td className="px-6 py-4">{poll.category}</td>
                <td className="px-6 py-4 ">
                  {statusPoll(poll.startTime, poll.endTime).label}
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

export default ManagerPollListSection;
