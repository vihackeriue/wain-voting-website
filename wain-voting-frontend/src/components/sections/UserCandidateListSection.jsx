import React from "react";
import { CandidateCard } from "../ui/card/CandidateCard";
import Slider from "react-slick";

import { useVote } from "../../hooks/useVote";

function UserCandidateListSection({
  candidates,
  chainIdPoll,
  isValidUserVoting,
  fetchRemainingVotes,
}) {
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024, // ≤ 1024px: hiển thị 2
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, // ≤ 640px: hiển thị 1
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const { vote } = useVote(chainIdPoll, isValidUserVoting, fetchRemainingVotes);

  console.log("isValidUserVoting: ", isValidUserVoting);
  return (
    <div>
      <h1 className="text-3xl font-bold text-center mt-5">
        Danh sách ứng viên
      </h1>
      <div className="slider-container my-10 ">
        <Slider
          {...settings}
          className={candidates.length > 4 ? "custom-slider" : ""}
        >
          {candidates.map((item) => (
            <CandidateCard
              candidate={item}
              isValidUserVoting={isValidUserVoting}
              onVote={() => vote(item.chainId)}
            />
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default UserCandidateListSection;
