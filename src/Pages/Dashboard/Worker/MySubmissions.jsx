import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const MySubmissions = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: submissions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "submissions"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/submissions/${user?.email}`);
      return data;
    },
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10; // Number of submissions to display per page

  const totalPages = Math.ceil(submissions.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const paginatedSubmissions = submissions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  return (
    <div>
      <div className="max-w-7xl mx-auto p-6">
        <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
            My Submissions
          </h2>
          <table className="table w-full table-auto">
            {/* head */}
            <thead className="bg-green-500 text-white">
              <tr>
                <th className="py-3 px-6 text-left">#</th>
                <th className="py-3 px-6 text-left">Title</th>
                <th className="py-3 px-6 text-left">Buyer Name</th>
                <th className="py-3 px-6 text-left">Payable Amount</th>
                <th className="py-3 px-6 text-left">Status</th>
                <th className="py-3 px-6 text-left">Submission Date</th>
              </tr>
            </thead>
            {/* body */}
            <tbody>
              {paginatedSubmissions.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-lg text-gray-700"
                  >
                    No submissions found.
                  </td>
                </tr>
              ) : (
                paginatedSubmissions.map((sub, idx) => (
                  <tr
                    key={`${sub.task_id}-${idx}`}
                    className="border-b hover:bg-gray-50 text-gray-800"
                  >
                    <td className="py-3 px-6">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-3 px-6">{sub.title}</td>
                    <td className="py-3 px-6">{sub.buyer_name}</td>
                    <td className="py-3 px-6 text-amber-500 ">
                      {sub.payable_amount}
                    </td>
                    <td className="py-3 px-6">
                      <span
                        className={`text-sm font-semibold ${
                          sub.status === "Approved"
                            ? "text-green-600"
                            : sub.status === "pending"
                            ? "text-yellow-500"
                            : "text-red-500"
                        }`}
                      >
                        {sub.status}
                      </span>
                    </td>
                    <td className="py-3 px-6">
                      {new Date(sub.submission_date).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination */}
          <div className="flex justify-center items-center mt-4">
            <button
              className="px-4 py-2 mx-1 bg-green-500 text-white rounded-md disabled:opacity-50"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            {Array.from({ length: totalPages }, (_, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 mx-1 rounded-md ${
                  currentPage === idx + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
                onClick={() => handlePageChange(idx + 1)}
              >
                {idx + 1}
              </button>
            ))}
            <button
              className="px-4 py-2 mx-1 bg-green-500 text-white rounded-md disabled:opacity-50"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MySubmissions;
