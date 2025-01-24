import { useQuery } from "@tanstack/react-query";
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

  console.log(submissions);

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
              {submissions.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="py-6 text-center text-lg text-gray-700"
                  >
                    No submissions found.
                  </td>
                </tr>
              ) : (
                submissions.map((sub, idx) => (
                  <tr
                    key={sub.task_id}
                    className="border-b hover:bg-gray-50 text-gray-800"
                  >
                    <td className="py-3 px-6">{idx + 1}</td>
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
        </div>
      </div>
    </div>
  );
};

export default MySubmissions;
