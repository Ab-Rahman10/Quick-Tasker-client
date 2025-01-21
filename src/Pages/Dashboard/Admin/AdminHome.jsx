import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import useAuth from "../../../Hooks/useAuth";

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

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  // total workers
  const totalWorkers = users.filter((worker) => worker.role === "worker");

  // total buyers
  const totalBuyers = users.filter((buyer) => buyer.role === "buyer");

  // total available coins
  const arrayOfCoins = users.map((onlyCoins) => onlyCoins.availableCoins);
  const totalCoins = arrayOfCoins.reduce((total, coins) => total + coins, 0);

  return (
    <div className="max-w-7xl mx-auto p-6">
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
            $7800
          </div>
          <div className="stat-desc text-center text-gray-500 mt-2">
            All completed payments
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminStats;
