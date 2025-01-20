import React from "react";
import { Link } from "react-router-dom";

const TaskCard = ({ task }) => {
  const {
    title,
    name,
    completion_date,
    payable_amount,
    required_workers,
    _id,
    task_image,
  } = task;

  return (
    <div className="max-w-xs mx-auto bg-white rounded-lg shadow-lg overflow-hidden my-6 hover:scale-105 transform transition-all duration-300">
      <img src={task_image} alt={title} className="w-full h-48 object-cover" />
      <div className="p-6">
        <h3 className="text-2xl font-semibold text-gray-800 truncate">
          {title}
        </h3>
        <p className="text-gray-600 mt-2">Buyer: {name}</p>
        <p className="text-gray-600 mt-2">Completion Date: {completion_date}</p>
        <p className="text-lg font-bold text-green-500 mt-2">
          Payable Amount: ${payable_amount}
        </p>
        <p className="text-gray-600 mt-2">
          Required Workers: {required_workers}
        </p>

        {/* View Details Button */}
        <div className="mt-4">
          <Link
            to={`/task-details/${_id}`}
            className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
