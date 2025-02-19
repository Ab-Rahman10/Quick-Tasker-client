import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Link } from "react-router-dom";

const WhyQuickTasker = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 py-16 mb-28">
      <div className="w-11/12 lg:w-9/12 mx-auto text-center text-white">
        {/* Heading with AOS fade-in effect */}
        <h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
          data-aos="fade-in"
        >
          Why Choose{" "}
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            QuickTasker
          </span>
          ?
        </h2>

        {/* Paragraph with AOS fade-in effect */}
        <p
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 leading-relaxed"
          data-aos="fade-in"
          data-aos-delay="300"
        >
          Revolutionize your task management experience. Stay organized and
          efficient with our user-friendly solution.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[
            {
              title: "Collaborative Environment",
              description: "Streamline teamwork for enhanced productivity.",
              icon: "🤝",
            },
            {
              title: "Real-Time Sync",
              description: "Instant updates keep everyone on the same page.",
              icon: "🚀",
            },
            {
              title: "Fully Customizable",
              description: "Tailor QuickTasker to your unique needs.",
              icon: "🛠️",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white rounded-lg p-6 text-gray-800 shadow-lg hover:shadow-xl transition-all"
              data-aos="fade-up"
              data-aos-delay={index * 200}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Button with AOS fade-in effect */}
        <div className="mt-12" data-aos="fade-in" data-aos-delay="600">
          <Link to="/all-tasks">
            <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-blue-700 transition">
              Get Started Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default WhyQuickTasker;
