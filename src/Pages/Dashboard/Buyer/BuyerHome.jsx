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
      {/* States */}
      <div className="flex justify-center">
        <div className="stats stats-vertical md:stats-horizontal shadow gap-4 mt-5 flex">
          {/* Total Tasks */}
          <div className="stat">
            <div className="stat-title text-center md:text-left">
              Total Tasks
            </div>
            <div className="stat-value text-center md:text-left">
              {tasks.length}
            </div>
            <div className="stat-desc text-center md:text-left">
              All tasks added by you
            </div>
          </div>

          {/* Pending Tasks */}
          <div className="stat">
            <div className="stat-title text-center md:text-left">
              Pending Tasks
            </div>
            <div className="stat-value text-center md:text-left">
              {pendingTasks}
            </div>
            <div className="stat-desc text-center md:text-left">
              Sum of all required workers
            </div>
          </div>

          {/* Total Payment */}
          <div className="stat">
            <div className="stat-title text-center md:text-left">
              Total Payment
            </div>
            <div className="stat-value text-center md:text-left">$250.00</div>
            <div className="stat-desc text-center md:text-left">
              Total amount paid by you
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BuyerHome;
