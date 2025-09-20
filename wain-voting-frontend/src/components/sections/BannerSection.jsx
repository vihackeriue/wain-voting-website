import React from "react";

import bannerVoting from "../../assets/images/banner-voting.jpg";
function BannerSection() {
  return (
    <div className=" duration-300 text-secondary-900">
      <div className="container min-h-[620px] flex mt-10 sm:mt-0">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 place-items-center">
          {/* Image section */}
          <div
            data-aos="zoom-in"
            className="order-1 sm:order-2 relative inline-block"
          >
            {/* Khung đằng sau */}
            <div className="absolute top-1/7 left-1/6 w-full sm:max-w-[280px] md:max-w-[430px] h-full bg-secondary-700 opacity-70 rounded-3xl"></div>

            {/* Ảnh */}
            <img
              src={bannerVoting}
              alt="Voting banner"
              className="relative w-full sm:max-w-[280px] md:max-w-[430px] rounded-3xl shadow-2xl z-1"
            />
          </div>

          {/* Text section */}
          <div className="space-y-5 order-2 sm:order-1 xl:pr-40 ">
            <h1
              data-aos="fade-up"
              className="text-4xl sm:text-5xl font-semibold"
              style={{ lineHeight: 1.2 }}
            >
              Hệ thống bình chọn{" "}
              <span className="text-primary">Wain Voting</span>
            </h1>
            <p data-aos="fade-up" data-aos-delay="300">
              Hệ thống của chúng tôi đảm bảo mọi lá phiếu được ghi nhận và không
              thể bị thay đổi, nhờ vào công nghệ Blockchain hiện đại.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BannerSection;
