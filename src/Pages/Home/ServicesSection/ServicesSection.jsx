import { FaCalendarAlt, FaUsers, FaChartLine } from "react-icons/fa";

const ServicesSection = () => {
  const services = [
    {
      title: "Task Scheduling",
      description:
        "Organize your tasks with ease and never miss a deadline again.",
      icon: <FaCalendarAlt className="text-green-500 text-3xl mb-3" />,
    },
    {
      title: "Collaboration",
      description:
        "Seamlessly collaborate with your team to achieve your goals faster.",
      icon: <FaUsers className="text-green-500 text-3xl mb-3" />,
    },
    {
      title: "Analytics",
      description:
        "Gain insights into your productivity with our advanced analytics.",
      icon: <FaChartLine className="text-green-500 text-3xl mb-3" />,
    },
  ];

  return (
    <div className="py-16 px-5 md:px-20">
      <div className="text-center mb-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gray-800">
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
            className="p-6 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all overflow-hidden relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 to-gray-500 opacity-20 rounded-xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              {service.icon}
              <h3 className="text-xl font-bold text-green-500 mb-3">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm text-center">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesSection;
