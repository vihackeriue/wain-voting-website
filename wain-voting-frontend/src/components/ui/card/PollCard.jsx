import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { statusPoll } from "../../../utils/poll";

function PollCard({ poll }) {
  const navigate = useNavigate();

  return (
    <div className=" dark:text-primary group">
      <div className="overflow-hidden rounded-2xl">
        <img
          src={poll.image}
          alt="No image"
          className="mx-auto h-[420px] w-full object-cover group-hover:scale-105 duration-300"
        />
      </div>
      <div
        className="space-y-2 p-4 ml-6 bg-white dark:bg-dark -translate-y-16 rounded-2xl"
        onClick={() => navigate(`/poll-detail/${poll.id}`)}
      >
        <h1 className="line-clamp-1 text-2xl font-semibold">{poll.title}</h1>
        <p className="line-clamp-1 text-gray-500 text-sm">{poll.description}</p>
        <div className="flex justify-between pr-4 text-gray-500">
          <p
            className={`p-2 rounded-md ${
              statusPoll(poll.startTime, poll.endTime).color
            }`}
          >
            {statusPoll(poll.startTime, poll.endTime).label}
          </p>
          <FaArrowRight className="group-hover:text-primary group-hover:translate-x-2 duration-300" />
        </div>
      </div>
    </div>
  );
}

export default PollCard;
