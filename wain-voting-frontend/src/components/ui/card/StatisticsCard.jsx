import React from "react";

function StatisticsCard({ stat, children, icon: Icon }) {
  console.log("stat", stat);
  return (
    <div className="bg-dark-900  p-4 flex-1 border border-dark-50 flex items-center rounded-lg">
      <div className="rounded-full w-12 h-12 flex items-center justify-center bg-primary">
        <Icon className="text-2xl text-white" />
      </div>
      <div className="pl-4">
        <p className="text-sm text-gray-500 font-semibold">{children}</p>
        <div className="flex items-center">
          <p className="text-xl text-gray-700 font-semibold">{stat}</p>
        </div>
      </div>
    </div>
  );
}

export default StatisticsCard;
