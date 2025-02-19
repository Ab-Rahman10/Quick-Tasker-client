import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import TaskToReview from "./TaskToReview";
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

const BuyerHome = () => {
  const { user, loading } = useAuth();
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

  // sum of all required_workers count of his added Tasks
  const totalWorkers = tasks.map((task) => task.required_workers);
  const pendingTasks = totalWorkers.reduce(
    (total, totalNumber) => total + totalNumber,
    0
  );

  // get total paid payment by the user
  const {
    data: approvedData = [],
    isLoading: approvedLoading,
    refetch: approvedRefetch,
  } = useQuery({
    queryKey: [user?.email, "total-payment"],
    enabled: !loading || !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(
        `/total-paid-payment/${user?.email}`
      );
      return data;
    },
  });

  // total payment
  const totalPayment = approvedData.reduce(
    (total, payment) => total + payment.payable_amount,
    0
  );

  useEffect(() => {
    AOS.init();
  }, []);

  if (approvedLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  return (
    <div>
      {/* Stats Section */}
      <div className="w-full mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-5">
          {/* Total Tasks */}
          <div
            className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            data-aos="fade-up"
          >
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
          <div
            className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            data-aos="fade-up"
          >
            <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
              Pending Tasks
            </div>
            <div className="stat-value text-3xl font-bold text-green-600">
              {pendingTasks}
            </div>
            <div className="stat-desc text-center text-gray-500 mt-2">
              Sum of all required workers
            </div>
          </div>

          {/* Total Payment */}
          <div
            className="stat-card bg-white rounded-lg shadow-lg p-6 flex flex-col items-center"
            data-aos="fade-up"
          >
            <div className="stat-title text-xl font-semibold text-gray-700 mb-2 text-center">
              Total Payment
            </div>
            {totalPayment && (
              <div className="stat-value text-3xl font-bold text-amber-500">
                {totalPayment}
              </div>
            )}
            <div className="stat-desc text-center text-gray-500 mt-2">
              Total amount paid by you
            </div>
          </div>
        </div>
      </div>
      {/* Task To review */}
      <TaskToReview
        refetch={refetch}
        approvedRefetch={approvedRefetch}
        data-aos="fade-up"
      ></TaskToReview>
    </div>
  );
};

export default BuyerHome;
