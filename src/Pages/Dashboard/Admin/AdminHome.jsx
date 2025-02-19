import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";
import toast from "react-hot-toast";

const AdminStats = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: users = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "users"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/${user?.email}`);
      return data;
    },
  });

  // total workers
  const totalWorkers = users.filter((worker) => worker.role === "worker");

  // total buyers
  const totalBuyers = users.filter((buyer) => buyer.role === "buyer");

  // total available coins
  const arrayOfCoins = users.map((onlyCoins) => onlyCoins.availableCoins);
  const totalCoins = arrayOfCoins.reduce((total, coins) => total + coins, 0);

  // Withdraw request
  const {
    data: withdraws = [],
    isLoading: withdrawLoading,
    refetch: withdrawRefetch,
  } = useQuery({
    queryKey: ["withdraws"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/withdraws`);
      return data;
    },
  });

  // console.log(withdraws);

  const pendingWithdraws = withdraws.filter(
    (pendingWithdraw) => pendingWithdraw.status === "pending"
  );

  // console.log(pendingWithdraws);

  // Total successful withdrawals
  const totalPayments = withdraws
    .filter((withdraw) => withdraw.status === "Approved")
    .reduce((total, withdraw) => total + withdraw.coins / 20, 0); // Assuming 20 coins = $1

  // console.log(totalPayments);

  if (isLoading || withdrawLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  // after clicking payment success button
  const handleUpdate = async (withdraw) => {
    try {
      const { data } = await axiosSecure.patch("/payment-success", withdraw);
      if (data.message === "success") {
        toast.success("Request approved successfully!");
        withdrawRefetch();
        refetch();
      }
      if (data.message === "Insufficient coins") {
        toast.error(data.message);
      }
    } catch (err) {
      // console.log(err);
    }
  };

  return (
    <div className="w-full mx-auto p-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-5">
        {/* Total Workers */}
        <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
            Total Workers
          </div>
          <div className="stat-value text-3xl font-bold text-green-600">
            {totalWorkers.length}
          </div>
          <div className="stat-desc text-center text-gray-500 mt-2">
            All registered workers
          </div>
        </div>

        {/* Total Buyers */}
        <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
            Total Buyers
          </div>
          <div className="stat-value text-3xl font-bold text-green-600">
            {totalBuyers.length}
          </div>
          <div className="stat-desc text-center text-gray-500 mt-2">
            All registered buyers
          </div>
        </div>

        {/* Total Coins */}
        <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
            Total Available Coins
          </div>
          <div className="stat-value text-3xl font-bold text-amber-600">
            {totalCoins}
          </div>
          <div className="stat-desc text-center text-gray-500 mt-2">
            Sum of all user coins
          </div>
        </div>

        {/* Total Payments */}
        <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
          <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
            Total Payments
          </div>
          <div className="stat-value text-3xl font-bold text-blue-600">
            ${totalPayments}
          </div>
          <div className="stat-desc text-center text-gray-500 mt-2">
            All completed payments
          </div>
        </div>
      </div>

      {/* Withdraw request */}
      <div className="mt-10 ">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Withdrawal Requests
        </h1>
        <div className="overflow-x-auto">
          <table className="table border">
            {/* Table Header */}
            <thead className="bg-green-500 text-white">
              <tr>
                <th>#</th>
                <th>User Name</th>
                <th>User Email</th>
                <th>Withdrawal Amount (Coins)</th>
                <th>Withdrawal Amount ($)</th>
                <th>Payment System</th>
                <th>Account Number</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            {/* Table Body */}
            <tbody>
              {pendingWithdraws.length === 0 ? (
                <tr>
                  <td
                    colSpan="9"
                    className="px-4 py-2 text-center text-xl text-gray-500"
                  >
                    Not found
                  </td>
                </tr>
              ) : (
                pendingWithdraws.map((withdraw, idx) => (
                  <tr key={withdraw._id}>
                    <td>{idx + 1}</td>
                    <td>{withdraw.user?.name}</td>
                    <td>{withdraw.user?.email}</td>
                    <td className="text-amber-500">{withdraw.coins}</td>
                    <td>${(withdraw.coins / 20).toFixed(2)}</td>
                    <td>{withdraw.payment_system}</td>
                    <td>{withdraw.account_number}</td>
                    <td>
                      <span className="text-yellow-500">{withdraw.status}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => handleUpdate(withdraw)}
                        className="py-1 px-3 rounded-md bg-green-500 text-white"
                      >
                        {" "}
                        Payment success
                      </button>
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

export default AdminStats;
