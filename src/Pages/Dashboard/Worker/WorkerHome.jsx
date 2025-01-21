import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const WorkerHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: submissions = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "submissions"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/submissions/${user?.email}`);
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  // Get pending submissions
  const pendingSubmissions = submissions.filter(
    (sub) => sub.status === "pending"
  );

  // Get approved submissions
  const approvedSubmissions = submissions.filter(
    (sub) => sub.status === "Approved"
  );

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <div className="stat-card p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Total Submissions
          </h3>
          <p className="text-3xl font-bold text-green-600">
            {submissions.length}
          </p>
          <p className="text-sm text-gray-500">All tasks submitted by you</p>
        </div>

        <div className="stat-card p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">
            Pending Submissions
          </h3>
          <p className="text-3xl font-bold text-yellow-500">
            {pendingSubmissions.length}
          </p>
          <p className="text-sm text-gray-500">Tasks that are still pending</p>
        </div>

        <div className="stat-card p-6 bg-white rounded-lg shadow-lg flex flex-col items-center">
          <h3 className="text-lg font-semibold text-gray-700">Total Payment</h3>
          <p className="text-3xl font-bold text-blue-500">$20</p>
          <p className="text-sm text-gray-500">
            Total amount payable for completed tasks
          </p>
        </div>
      </div>

      {/* Approved Submissions Table */}
      <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md border border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Approved Submissions
        </h2>
        <table className="table w-full table-auto">
          {/* Table Head */}
          <thead className="bg-green-500 text-white">
            <tr>
              <th className="py-3 px-6 text-left">#</th>
              <th className="py-3 px-6 text-left">Title</th>
              <th className="py-3 px-6 text-left">Payable Amount</th>
              <th className="py-3 px-6 text-left">Buyer Name</th>
              <th className="py-3 px-6 text-left">Status</th>
            </tr>
          </thead>
          {/* Table Body */}
          <tbody>
            {approvedSubmissions.length === 0 ? (
              <tr>
                <td
                  colSpan="5"
                  className="py-6 text-center text-lg text-gray-700 font-medium"
                >
                  No Approved Submissions found.
                </td>
              </tr>
            ) : (
              approvedSubmissions.map((sub, idx) => (
                <tr
                  key={sub._id}
                  className="border-b hover:bg-gray-50 text-gray-800"
                >
                  <td className="py-3 px-6">{idx + 1}</td>
                  <td className="py-3 px-6">{sub.title}</td>
                  <td className="py-3 px-6">${sub.payable_amount}</td>
                  <td className="py-3 px-6">{sub.buyer_name}</td>
                  <td className="py-3 px-6 text-green-600 font-semibold">
                    {sub.status}
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

export default WorkerHome;
