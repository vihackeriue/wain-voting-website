import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
function PollStatisticsResultSection({ pollResult }) {
  if (!pollResult || !pollResult.candidates) {
    return (
      <div className="p-4 bg-white rounded-sm border border-gray-200">
        <strong className="text-gray-700 font-medium">Chưa có dữ liệu</strong>
      </div>
    );
  }
  // Chuẩn bị dữ liệu cho recharts
  const data = pollResult.candidates.map((c) => ({
    name: c.name, // hiển thị tên ứng viên
    votes: c.voteCount, // số vote
  }));

  return (
    <div className="h-[22rem] p-4 bg-white rounded-sm border border-gray-200 flex flex-col">
      <strong className="text-gray-700 font-medium">
        Thống kê lượt bình chọn
      </strong>
      <div className="w-full flex-1 mt-3 text-xs">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 20, right: 10, left: -10, bottom: 0 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Bar
              dataKey="votes"
              barSize={50}
              fill="#ea588c"
              name="Số lượt vote"
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PollStatisticsResultSection;
