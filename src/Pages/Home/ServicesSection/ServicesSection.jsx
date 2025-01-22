import React from "react";
import { motion } from "framer-motion";
import { RxTransparencyGrid } from "react-icons/rx";

const ServicesSection = () => {
  const containerVariant = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const infiniteVariant = {
    animate: {
      x: ["0%", "100%"],
      transition: {
        x: {
          repeat: Infinity,
          repeatType: "loop",
          duration: 5,
          ease: "linear",
        },
      },
    },
  };

  return (
    <div className="py-16 px-5 md:px-20">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Our Premium Services
        </h2>
        <p className="text-gray-600 text-sm md:text-lg">
          Experience the best task management solutions tailored to your needs.
        </p>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-8"
        variants={containerVariant}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          variants={itemVariant}
        >
          <h3 className="text-xl font-bold text-green-500 mb-3">
            Task Scheduling
          </h3>
          <p className="text-gray-600 text-sm">
            Organize your tasks with ease and never miss a deadline again.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          variants={itemVariant}
        >
          <h3 className="text-xl font-bold text-green-500 mb-3">
            Collaboration
          </h3>
          <p className="text-gray-600 text-sm">
            Seamlessly collaborate with your team to achieve your goals faster.
          </p>
        </motion.div>

        <motion.div
          className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition duration-300"
          variants={itemVariant}
        >
          <h3 className="text-xl font-bold text-green-500 mb-3">Analytics</h3>
          <p className="text-gray-600 text-sm">
            Gain insights into your productivity with our advanced analytics.
          </p>
        </motion.div>
      </motion.div>

      <div className="mt-5 md:mt-8 relative flex justify-center">
        <motion.div
          className="relative"
          animate={{ x: [-30, -50, -30] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity }}
        >
          <img
            className="w-28 md:w-36 h-20 rounded-md"
            src="https://i.ibb.co.com/qxmMmRp/pexels-photo-15406294.webp"
            alt="Task Scheduling"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs md:text-sm font-bold">
            Stay Organized
          </div>
        </motion.div>

        <motion.div
          className="relative ml-5"
          animate={{ x: [30, 50, 30] }}
          transition={{ duration: 5, delay: 1, repeat: Infinity }}
        >
          <img
            className="w-28 md:w-36 h-20 rounded-md"
            src="https://i.ibb.co.com/GW0G8s2/pexels-photo-270637.jpg"
            alt="Team Collaboration"
          />
          <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 text-white text-xs md:text-sm font-bold text-center">
            Collaborate Effectively
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ServicesSection;
