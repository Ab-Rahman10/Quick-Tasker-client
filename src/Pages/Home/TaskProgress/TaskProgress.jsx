import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { motion } from "framer-motion";

const TaskProgress = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <section className="py-12 sm:py-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-8 text-center">
        {/* Heading */}
        <motion.h2
          className="text-3xl md:text-4xl font-bold mt-4 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          Track Your Task Progress
        </motion.h2>

        {/* Progress Bar Container */}
        <motion.div
          className="w-full max-w-sm sm:max-w-md lg:max-w-lg mx-auto bg-gray-200 rounded-full h-6 mb-6"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ duration: 1 }}
        >
          {/* Progress Bar */}
          <motion.div
            className="h-full bg-green-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: "80%" }}
            transition={{ duration: 1 }}
          />
        </motion.div>

        {/* Progress Text */}
        <motion.p
          className="text-base sm:text-lg md:text-xl font-medium text-gray-700"
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          You've completed <span className="text-green-600 font-bold">80%</span>{" "}
          of your task today. Keep going!
        </motion.p>

        {/* Task Details (with AOS) */}
        <div className="mt-10 space-y-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md" data-aos="fade-up">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Task Summary
            </h3>
            <ul className="list-disc list-inside text-left text-gray-600">
              <li>Task Title: "Complete Dashboard Design"</li>
              <li>Start Date: 15th Feb 2025</li>
              <li>Due Date: 20th Feb 2025</li>
              <li>Assigned to: John Doe</li>
            </ul>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Estimated Time Remaining
            </h3>
            <p className="text-gray-600">Approximate time left: 2 hours</p>
          </div>

          <div
            className="bg-white p-6 rounded-lg shadow-md"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Keep Up the Good Work!
            </h3>
            <p className="text-gray-600">
              You're doing great! Stay focused and you'll complete your task in
              no time. Remember, progress is progress, no matter how small.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TaskProgress;
