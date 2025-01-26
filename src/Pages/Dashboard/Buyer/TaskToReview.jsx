import { useQuery } from "@tanstack/react-query";
import React, { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import toast from "react-hot-toast";

const TaskToReview = ({ refetch: refetchStats, approvedRefetch }) => {
  const [modalData, setModalData] = useState(null);
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: pendingSubs = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "pendingSubs"],
    enabled: !loading || !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/review-task/${user?.email}`);
      return data;
    },
  });

  if (loading && isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  const openModal = (submission) => {
    setModalData(submission);
  };

  const closeModal = () => {
    setModalData(null);
  };

  // Handle approve button
  const handleApprove = async (submissionData) => {
    try {
      const { data } = await axiosSecure.patch("/approve-task", submissionData);
      if (data.message === "success") {
        toast.success("Task has been approved");
      }
      refetch();
      refetchStats();
      approvedRefetch();
    } catch (err) {
      console.log("Error from approve task", err);
    }
  };

  // Handle reject button
  const handleReject = async (submissionData) => {
    try {
      const { data } = await axiosSecure.patch("/reject-task", submissionData);
      console.log(data);

      if (data.message === "success") {
        toast.success("Task has been rejected successfully!");
      }
      refetchStats();
      refetch();
    } catch (err) {
      console.log("Error from reject task", err);
    }
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-2xl font-bold mb-4 text-center">
        Task Submissions to Review
      </h2>

      {/* If no data found */}
      {pendingSubs.length === 0 ? (
        <div className="text-center text-xl text-red-500">Not found</div>
      ) : (
        // Submissions Table
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-green-500 text-white">
                <th className=" border-gray-300 px-4 py-2">#</th>
                <th className=" border-gray-300 px-4 py-2">Worker Name</th>
                <th className=" border-gray-300 px-4 py-2">Task Title</th>
                <th className=" border-gray-300 px-4 py-2">Payable Amount</th>
                <th className=" border-gray-300 px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingSubs.map((submission, idx) => (
                <tr key={submission._id}>
                  <td className="text-center">{idx + 1}</td>
                  <td className=" border-gray-300 px-4 py-2 text-center">
                    {submission.worker_name}
                  </td>
                  <td className="text-center border-gray-300 px-4 py-2">
                    {submission.title}
                  </td>
                  <td className=" border-gray-300 px-4 py-2 text-amber-500 text-center">
                    {submission.payable_amount}
                  </td>
                  <td className="flex items-center justify-center gap-3 border-gray-300 px-4 py-2 space-x-2">
                    <button
                      className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 whitespace-nowrap"
                      onClick={() => openModal(submission)}
                    >
                      View Submission
                    </button>
                    <div className="flex gap-3">
                      <button
                        onClick={() => handleApprove(submission)}
                        className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleReject(submission)}
                        className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {modalData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-md shadow-lg p-6 w-96">
            <h3 className="text-xl font-bold mb-4">
              Submission Details for {modalData.worker_name}
            </h3>
            <hr />
            <p className="my-4">{modalData.submission_info}</p>
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskToReview;
