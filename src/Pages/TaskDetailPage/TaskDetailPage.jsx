import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";

const TaskDetailPage = () => {
  const task = useLoaderData();
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">
        Task Details
      </h2>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Task Image */}
        <div className="lg:w-1/3">
          <img
            src={task.task_image}
            alt={task.title}
            className="rounded-lg w-full h-60 object-cover"
          />
        </div>

        {/* Task Details */}
        <div className="lg:w-2/3">
          <h3 className="text-2xl font-semibold text-green-500 mb-4">
            {task.title}
          </h3>
          <p className="text-gray-600 mb-2">
            <strong>Details:</strong> {task.detail}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Required Workers:</strong> {task.required_workers}
          </p>
          <p className="text-amber-500 mb-2">
            <strong className="text-gray-600">Payable Amount: </strong>
            {task.payable_amount}
          </p>
          <p className="text-gray-600 mb-2">
            <strong>Completion Date:</strong> {task.completion_date}
          </p>
        </div>
      </div>

      {/* Back to All Tasks Button */}
      <div className="text-center mt-6">
        <button
          onClick={() => navigate("/all-tasks")}
          className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
        >
          Back to All Tasks
        </button>
      </div>
    </div>
  );
};

export default TaskDetailPage;
