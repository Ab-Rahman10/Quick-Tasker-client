import { motion } from "framer-motion";

const TaskProgress = () => {
  return (
    <section className="py-12 sm:py-20 bg-gray-50">
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
      </div>
    </section>
  );
};

export default TaskProgress;
