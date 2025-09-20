import React from "react";
import SectionTitle from "../ui/SectionTitle";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";

function PollResultSection({ pollResult, isPollEnded }) {
  if (!pollResult?.candidates?.length) return null;

  // Tính toán dữ liệu từ pollResult
  const candidates = pollResult.candidates;

  // Tổng phiếu
  const totalVotes = candidates.reduce((sum, c) => sum + (c.voteCount || 0), 0);

  // Sắp xếp theo số phiếu giảm dần
  const sortedCandidates = [...candidates].sort(
    (a, b) => (b.voteCount || 0) - (a.voteCount || 0)
  );

  const leader = sortedCandidates[0];
  const leaderRate = totalVotes
    ? ((leader.voteCount / totalVotes) * 100).toFixed(2)
    : 0;

  // Chuẩn bị dữ liệu cho biểu đồ (Top 3)
  const top3 = sortedCandidates.slice(0, 3).map((c) => ({
    name: c.name,
    value: c.voteCount || 0,
  }));

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];

  return (
    <>
      <SectionTitle>Kết quả cuộc bình chọn</SectionTitle>
      <div className="flex flex-row text-secondary-900 gap-5">
        {/* Người thắng cuộc */}
        <div className="flex-1 border p-4 border-dark-50 bg-secondary-700/20 text-secondary-900 py-5 rounded-2xl">
          <strong className="text-secondary-900 font-semibold text-2xl">
            {isPollEnded ? "Người thắng cuộc" : "Người dẫn đầu"}
          </strong>
          <div className="flex flex-col items-center gap-3">
            <img
              src={leader.image}
              alt={leader.name}
              className="w-40 h-40 rounded-full border border-primary object-cover"
            />
            <p className="text-2xl font-semibold">{leader.name}</p>
            <p className="text-secondary-700">
              <strong>Tỉ lệ bình chọn: </strong>
              {leaderRate}%
            </p>
            <p>
              <strong>Tổng phiếu: </strong>
              {leader.voteCount}
            </p>
          </div>
        </div>

        {/* Top 3 PieChart */}
        <div className="w-[20rem] h-[22rem] p-4 bg-secondary-700/20 border border-dark-50 flex-1 flex flex-col rounded-2xl">
          <strong className="text-secondary-900 font-semibold text-2xl">
            Top 3 ứng viên bình chọn cao nhất
          </strong>
          <div className="w-full flex-1 mt-3 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={top3}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {top3.map((entry, index) => (
                    <Cell
                      key={`cell-${entry.name}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </>
  );
}

export default PollResultSection;
