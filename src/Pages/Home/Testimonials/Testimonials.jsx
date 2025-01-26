import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const Testimonials = () => {
  const axiosPublic = useAxiosPublic();

  const { data: reviews = [], isLoading } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/reviews");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="py-16 bg-gradient-to-r from-blue-50 via-white to-blue-50">
      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-10">
          Our Happy Clients
        </h2>
        <Swiper
          navigation={true}
          pagination={{ clickable: true }}
          modules={[Navigation, Pagination]}
          className="mySwiper"
          spaceBetween={30}
          slidesPerView={1}
          breakpoints={{
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review) => (
            <SwiperSlide key={review._id}>
              <div className="shadow-xl bg-white rounded-lg p-8 flex flex-col items-center text-center border-t-4 border-green-600 hover:scale-105 transform transition duration-300 ease-in-out">
                <img
                  src={review.photo}
                  alt={review.name}
                  className="w-24 h-24 object-cover rounded-full mb-4 border-4 border-green-500"
                />
                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {review.name}
                </h3>
                <p className="text-sm text-gray-600 italic mb-4">
                  "{review.feedback}"
                </p>
                <div className="flex justify-center items-center text-yellow-500 text-lg">
                  {Array(review.rating).fill("⭐").join("")}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Testimonials;
