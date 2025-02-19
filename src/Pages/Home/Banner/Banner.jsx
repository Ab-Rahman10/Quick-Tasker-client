import slide1 from "../../../assets/banner/slider1.png";
import slide2 from "../../../assets/banner/slider2.jpg";
import slide3 from "../../../assets/banner/slider3.jpg";

import "swiper/css";
import "swiper/css/effect-fade";
import { Autoplay, EffectFade, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Link } from "react-router-dom";

const Slider = () => {
  return (
    <Swiper
      modules={[Autoplay, EffectFade, Pagination]}
      autoplay={{
        delay: 3000,
        disableOnInteraction: false,
      }}
      effect="fade"
      spaceBetween={0}
      slidesPerView={1}
      loop={true}
      pagination={{ clickable: false }}
    >
      <SwiperSlide>
        <div className="relative">
          <img
            className="w-full md:h-[550px] h-96 object-cover"
            src={"https://i.ibb.co.com/1tLPQGhv/ZZZZZ2898-min.jpg"}
          />
          <div className="bg-black/75 absolute inset-0 z-10"></div>
          <div className="absolute top-[20%] left-[5%] md:left-[15%] z-20">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-CinzelDecorative text-white mb-1">
              Simplify Your Tasks
            </h3>
            <p className="text-gray-100 mb-2">
              Manage your tasks efficiently with QuickTasker. Stay organized,
              stay productive, <br /> and get things done effortlessly.
            </p>
            <p className="text-gray-100 text-xs mt-6">
              Start today and see your productivity soar!
            </p>

            <Link to="/all-tasks">
              <button className="mt-5 px-5 py-1 md:px-8 md:py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
                Get Started
              </button>
            </Link>
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img
            className="w-full md:h-[550px] h-96 object-cover"
            src={
              "https://i.ibb.co.com/1t9tVHDN/vecteezy-business-finance-technology-and-investment-concept-stock-14000797-min.jpg"
            }
          />
          <div className="bg-black/75 absolute inset-0 z-10"></div>
          <div className="absolute top-[20%] left-[5%] md:left-[15%] z-20">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-CinzelDecorative text-white mb-1">
              Smart Task Tracking
            </h3>
            <p className="text-gray-100 mb-2">
              Never lose track of your progress. With QuickTasker, <br />{" "}
              monitor and complete your tasks seamlessly.
            </p>
            <p className="text-gray-100 text-xs mt-6">
              Let’s take your task management to the next level.
            </p>

            {/* <button className="mt-5 px-5 py-1 md:px-8 md:py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
              Track Progress
            </button> */}
          </div>
        </div>
      </SwiperSlide>
      <SwiperSlide>
        <div className="relative">
          <img
            className="w-full md:h-[550px] h-96 object-cover"
            src={"https://i.ibb.co.com/1Y81wxSg/updated-image-min.jpg"}
          />
          <div className="bg-black/75 absolute inset-0 z-10"></div>
          <div className="absolute top-[20%] left-[5%] md:left-[15%] z-20">
            <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold font-CinzelDecorative text-white mb-1">
              Collaborate with Ease
            </h3>
            <p className="text-gray-100 mb-2">
              Connect with your team and collaborate on tasks effortlessly.{" "}
              <br /> QuickTasker makes teamwork simple and effective.
            </p>
            <p className="text-gray-100 text-xs mt-6">
              Your team’s productivity, redefined.
            </p>
            {/* 
            <button className="mt-5 px-5 py-1 md:px-8 md:py-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition">
              Collaborate Now
            </button> */}
          </div>
        </div>
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;
