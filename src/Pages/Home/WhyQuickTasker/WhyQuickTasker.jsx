import React from "react";
import { motion } from "framer-motion";

const WhyQuickTasker = () => {
  return (
    <div className="bg-gradient-to-r from-green-500 via-emerald-400 to-teal-500 py-16 px-4 sm:px-8 lg:px-20">
      <div className="max-w-7xl mx-auto text-center text-white">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-6"
        >
          Why Choose{" "}
          <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">
            QuickTasker
          </span>
          ?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-sm sm:text-base md:text-lg lg:text-xl mb-8 leading-relaxed"
        >
          Revolutionize your task management experience. Stay organized and
          efficient with our user-friendly solution.
        </motion.p>

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
            <motion.div
              key={index}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: index * 0.3 }}
              className="bg-white rounded-lg p-6 text-gray-800 shadow-lg hover:shadow-xl transition-all"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-sm sm:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-12"
        >
          <button className="bg-blue-500 text-white py-3 px-6 rounded-lg font-bold text-sm sm:text-base md:text-lg hover:bg-blue-700 transition">
            Get Started Now
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default WhyQuickTasker;
