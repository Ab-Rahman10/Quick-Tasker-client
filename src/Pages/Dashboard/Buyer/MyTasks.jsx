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
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="6"
                  className="py-6 text-center text-lg text-gray-700"
                >
                  No Tasks found.
                </td>
              </tr>
            ) : (
              tasks.map((task, idx) => (
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
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyTasks;
