import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const TaskReminder = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="p-8 rounded-lg container mx-auto mt-10"
      data-aos="fade-up"
      data-aos-duration="1000"
    >
      {/* Headline Section */}
      <div className="text-center mb-12" data-aos="fade-up">
        <h3 className="text-4xl font-semibold text-gray-800">
          Stay On Track with Your Task Reminder
        </h3>
        <p className="text-lg text-gray-500 mt-3">
          Keep track of your deadlines and goals efficiently with our simple
          task reminder system.
        </p>
      </div>

      {/* Task Details */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 gap-8 mb-8"
        data-aos="fade-up"
        data-aos-duration="1200"
      >
        {/* Task Description */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md" data-aos="fade-up">
          <h4 className="text-2xl font-medium text-gray-700 mb-4">
            Task Overview
          </h4>
          <p className="text-gray-600">
            Complete the final testing phase of the Dashboard Design and ensure
            all features are functional before the launch on February 20, 2025.
          </p>
        </div>

        {/* Task Deadline */}
        <div className="bg-gray-50 p-6 rounded-lg shadow-md" data-aos="fade-up">
          <h4 className="text-2xl font-medium text-gray-700 mb-4">Deadline</h4>
          <p className="text-gray-600">
            <span className="font-semibold text-gray-800">Due Date:</span> 20th
            Feb 2025
          </p>
        </div>
      </div>

      {/* Priority Section */}
      <div
        className="bg-gray-50 p-6 rounded-lg shadow-md mb-8"
        data-aos="fade-up"
        data-aos-duration="1500"
      >
        <h4 className="text-2xl font-medium text-gray-700 mb-4">
          Task Priority
        </h4>
        <p className="text-gray-600">
          This task is marked as{" "}
          <span className="font-semibold text-green-500">High Priority</span>.
          Complete it as soon as possible to stay ahead of your schedule.
        </p>
      </div>

      {/* Task Reminder Button */}
      <div className="text-center" data-aos="fade-up">
        <button className="bg-green-500 hover:bg-green-600 text-white py-3 px-8 rounded-lg focus:outline-none transition duration-300">
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default TaskReminder;
