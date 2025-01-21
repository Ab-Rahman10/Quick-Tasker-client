import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const BuyerHome = () => {
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

  //  sum of all  required_workers count of his added Tasks
  const totalWorkers = tasks.map((task) => task.required_workers);
  const pendingTasks = totalWorkers.reduce(
    (total, totalNumber) => total + totalNumber,
    0
  );

  // TODO:
  // Total payments

  return (
    <div>
      {/* Stats Section */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {/* Total Tasks */}
          <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
              Total Tasks
            </div>
            <div className="stat-value text-3xl font-bold text-green-600">
              {tasks.length}
            </div>
            <div className="stat-desc text-center text-gray-500 mt-2">
              All tasks added by you
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
              Pending Tasks
            </div>
            <div className="stat-value text-3xl font-bold text-yellow-500">
              {pendingTasks}
            </div>
            <div className="stat-desc text-center text-gray-500 mt-2">
              Sum of all required workers
            </div>
          </div>

          {/* Total Payment */}
          <div className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center">
            <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
              Total Payment
            </div>
            <div className="stat-value text-3xl font-bold text-blue-500">
              $250.00
            </div>
            <div className="stat-desc text-center text-gray-500 mt-2">
              Total amount paid by you
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
