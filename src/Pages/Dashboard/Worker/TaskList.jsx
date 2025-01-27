import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const TaskList = () => {
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get("/tasks");
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="mt-5 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
        Available Tasks
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {tasks.map((task) => (
          <div
            key={task._id}
            className="bg-white rounded-lg shadow-lg overflow-hidden my-6 hover:scale-105 transform transition-all duration-300"
          >
            <img
              src={task.task_image}
              alt={task.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-6">
              <p className="text-gray-600 mt-2 text-xs">
                Completion Date: {task.completion_date}
              </p>
              <p className="text-gray-600 mt-2 text-xs">
                Required Workers: {task.required_workers}
              </p>
              <h3 className="text-2xl font-semibold text-green-500 truncate my-5">
                {task.title}
              </h3>
              <p className="text-gray-600 mt-2">
                <span className="font-bold">Buyer: </span> {task.name}
              </p>

              <div className="flex justify-between gap-5 items-center">
                <p className="text-lg mt-2">
                  Coins:{" "}
                  <span className="text-amber-400 font-bold">
                    {task.payable_amount}
                  </span>
                </p>
                {/* View Details Button */}
                <div className="mt-4">
                  <Link
                    to={`/dashboard/task-details/${task._id}`}
                    className="inline-block px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all duration-300 whitespace-nowrap"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaskList;
