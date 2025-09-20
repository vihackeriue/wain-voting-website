import React from "react";
import {
  FaPoll,
  FaClock,
  FaHourglassStart,
  FaCheckCircle,
} from "react-icons/fa";
import StatisticsCard from "../ui/card/statisticsCard";
import { Cell, Pie, PieChart, ResponsiveContainer } from "recharts";
import SectionTitle from "../ui/SectionTitle";
import { formatDate } from "../../utils/date";

const COLORS = ["#00C49F", "#FFBB28", "#FF8042"];
function ManagerHomeSection({ stats, polls }) {
  const data = [
    { name: "Sắp diễn ra", value: stats?.upcomingPolls || 0 },
    { name: "Đang diễn ra", value: stats?.ongoingPolls || 0 },
    { name: "Đã kết thúc", value: stats?.finishedPolls || 0 },
  ];
  return (
    <div className="container">
      <div className="flex gap-4 w-full bg-dark-100 p-3 rounded-lg border  border-dark-50 shadow">
        <StatisticsCard stat={stats.totalPolls} icon={FaPoll}>
          Tống số cuộc bình chọn
        </StatisticsCard>
        <StatisticsCard stat={stats.upcomingPolls} icon={FaClock}>
          Đang diễn ra
        </StatisticsCard>
        <StatisticsCard stat={stats.ongoingPolls} icon={FaHourglassStart}>
          Sắp diễn ra
        </StatisticsCard>
        <StatisticsCard stat={stats.finishedPolls} icon={FaCheckCircle}>
          Đã kết thúc
        </StatisticsCard>
      </div>
      <div className="flex flex-row gap-6 pt-10">
        <div className="w-[20rem] h-[22rem] p-4 bg-secondary-700/20 border border-dark-50 flex-1 flex flex-col rounded-2xl ">
          <strong className="text-secondary-900 font-semibold text-2xl">
            Biểu đồ tổng quan
          </strong>
          <div className="w-full flex-1 mt-3 text-xs">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart width={400} height={400}>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value})`}
                  outerRadius={110}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
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
        <div className="flex-1 border border-dark-100 rounded-2xl p-4 shadow">
          <strong className="text-secondary-900 font-semibold text-2xl">
            Các cuộc bình chọn sắp tới
          </strong>
          <div className="flex flex-col gap-2 mt-3">
            {polls.slice(0, 3).map((poll) => (
              <div className="flex gap-2 p-2  rounded-lg bg-dark-50 shadow">
                <img
                  src={poll.image}
                  alt={poll.title}
                  className="size-16 p-1 rounded-lg"
                />
                <div className="flex flex-col gap-2">
                  <h2 className="text-xl font-semibold text-secondary-900">
                    {poll.title}
                  </h2>
                  <p className="text-md text-secondary-700">
                    {formatDate(poll.startTime)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManagerHomeSection;
