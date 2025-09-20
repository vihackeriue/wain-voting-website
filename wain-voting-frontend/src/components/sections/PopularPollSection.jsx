import React from "react";
import Slider from "react-slick";

import PollCard from "../ui/card/PollCard";
import SectionTitle from "../ui/SectionTitle";

function PopularPollSection({ polls }) {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3, // desktop
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
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
  return (
    <section className="slider-container container text-primary">
      <SectionTitle>Phổ biến</SectionTitle>
      <Slider {...settings} className="">
        {polls.map((poll) => (
          <div key={poll.id} className="px-1 sm:px-2 md:px-3">
            <PollCard poll={poll} />
          </div>
        ))}
      </Slider>
    </section>
  );
}

export default PopularPollSection;
