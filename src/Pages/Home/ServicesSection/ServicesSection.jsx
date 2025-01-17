import React from "react";
import { motion } from "framer-motion";

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

  return (
    <div className="bg-gray-100 py-16 px-5 md:px-20">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl md:text-5xl font-bold text-green-500 mb-4">
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
    </div>
  );
};

export default ServicesSection;
