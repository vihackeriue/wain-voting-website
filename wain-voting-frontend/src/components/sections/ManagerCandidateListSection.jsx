import React from "react";

function ManagerCandidateListSection({ candidates }) {
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">
        Danh sách ứng viên
      </h1>
      <div className="relative overflow-x-auto mt-10">
        <table className="w-full text-sm text-left rtl:text-right text-dark-100 bg-secondary-700 rounded-2xl">
          <thead className="text-xs uppercase ">
            <tr>
              <th scope="col" class="px-6 py-3">
                #
              </th>
              <th scope="col" class="px-6 py-3">
                Tên ứng viên
              </th>
              <th scope="col" class="px-6 py-3">
                Mô tả
              </th>
            </tr>
          </thead>
          <tbody class="border-b bg-secondary-900 text-dark-100">
            {candidates.map((candidate) => (
              <tr className="hover:bg-secondary-700">
                <td className="text-center">
                  <img
                    src={candidate.image}
                    alt=""
                    className="size-16 p-2 rounded-xl"
                  />
                </td>

                <td class="px-6 py-4">{candidate.name}</td>
                <td class="px-6 py-4">{candidate.description}</td>
                <td class="px-6 py-4">{candidate.endTime}</td>
                {/* <td class="px-6 py-4">{candidate.voteCount}</td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ManagerCandidateListSection;
