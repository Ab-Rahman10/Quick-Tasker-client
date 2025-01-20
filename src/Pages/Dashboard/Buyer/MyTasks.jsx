import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const MyTasks = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: tasks = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "tasks"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/tasks/${user?.email}`);
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Heading */}
      <h1 className="text-3xl font-bold text-green-500 mb-6 text-center">
        Task List
      </h1>

      <div className="overflow-x-auto">
        <table className="table w-full table-auto shadow-md border border-gray-200 rounded-lg">
          {/* head */}
          <thead className="bg-green-500 text-white">
            <tr>
              <th>No</th>
              <th>Title</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Details</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task, idx) => (
              <tr key={task._id} className="hover:bg-gray-100">
                <td>{idx + 1}</td>
                <td>{task.title}</td>
                <td className="text-center">{task.required_workers}</td>
                <td className="text-center">{task.payable_amount}</td>
                <td>{task.detail.slice(0, 20)}....</td>
                <td className="flex space-x-2">
                  <Link to={`/dashboard/update-task/${task._id}`}>
                    <button className="btn btn-xs btn-success text-white">
                      Update
                    </button>
                  </Link>
                  <button className="btn btn-xs btn-error text-white">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Mobile View - Cards */}
      <div className="lg:hidden mt-6">
        {tasks.map((task, idx) => (
          <div
            key={task._id}
            className="bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <h2 className="font-bold text-xl text-gray-800">{task.title}</h2>
            <p className="text-sm text-gray-600">
              Required Workers: {task.required_workers}
            </p>
            <p className="text-sm text-gray-600">
              Payable Amount: {task.payable_amount}
            </p>
            <p className="text-sm text-gray-500 mt-2">
              {task.detail.slice(0, 20)}....
            </p>
            <div className="flex space-x-2 mt-4">
              <button className="btn btn-xs btn-primary">Update</button>
              <button className="btn btn-xs btn-danger">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyTasks;
