import { useEffect } from "react";
import { FaCalendarAlt, FaUsers, FaChartLine } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ServicesSection = () => {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  const services = [
    {
      title: "Task Scheduling",
      description:
        "Organize your tasks with ease and never miss a deadline again.",
      icon: <FaCalendarAlt className="text-white text-3xl" />,
    },
    {
      title: "Collaboration",
      description:
        "Seamlessly collaborate with your team to achieve your goals faster.",
      icon: <FaUsers className="text-white text-3xl" />,
    },
    {
      title: "Analytics",
      description:
        "Gain insights into your productivity with our advanced analytics.",
      icon: <FaChartLine className="text-white text-3xl" />,
    },
  ];

  return (
    <div className="mb-28 w-11/12 lg:w-9/12 mx-auto">
      <div className="text-center mb-12">
        <h2
          data-aos="fade-in"
          className="text-3xl md:text-4xl font-bold mb-4 text-gray-800"
        >
          Our Premium Services
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Experience the best task management solutions tailored to your needs.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {services.map((service, index) => (
          <div
            key={index}
            data-aos="fade-up"
            data-aos-delay={index * 200}
            className="p-8 bg-white border border-gray-200 rounded-lg shadow-md hover:shadow-xl transform hover:scale-105 transition duration-300 flex flex-col md:flex-row items-center md:space-x-4"
          >
            <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-full mb-4 md:mb-0">
              {service.icon}
            </div>
            <div className="text-center md:text-left">
              <h3 className="text-xl font-bold text-green-600 mb-2">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
