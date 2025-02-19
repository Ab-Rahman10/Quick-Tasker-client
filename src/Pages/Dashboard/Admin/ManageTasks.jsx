import React, { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

const ManageTasks = () => {
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

  useEffect(() => {
    AOS.init();
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  // delete task
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/task-delete/${id}`);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "Your task has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          // console.log(err);
        }
      }
    });
  };

  return (
    <div className="mt-5 p-6">
      <h1 className="text-3xl font-bold mb-6 text-center" data-aos="fade-up">
        Manage Tasks
      </h1>
      <div className="overflow-x-auto" data-aos="fade-up">
        <table className="table border">
          {/* head */}
          <thead className="bg-green-500 text-white">
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Title</th>
              <th>Details</th>
              <th>Required Workers</th>
              <th>Payable Amount</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length === 0 ? (
              <tr>
                <td
                  colSpan="9"
                  className="px-4 py-2 text-center text-xl text-gray-500"
                >
                  Not found
                </td>
              </tr>
            ) : (
              tasks.map((task, idx) => (
                <tr key={task._id} data-aos="fade-up">
                  <td>{idx + 1}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={task.task_image} alt={task.title} />
                        </div>
                      </div>
                    </div>
                  </td>

                  <td className="font-bold">{task.title}</td>
                  <td>{task.detail.slice(0, 50)}...</td>
                  <td>{task.required_workers}</td>
                  <td>
                    <span className="text-amber-500">
                      {task.payable_amount}
                    </span>{" "}
                  </td>

                  <th className="space-x-2">
                    <button
                      onClick={() => handleDelete(task._id)}
                      className="py-1 px-3 rounded-md bg-red-500 text-white font-medium"
                    >
                      Delete
                    </button>
                  </th>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageTasks;
