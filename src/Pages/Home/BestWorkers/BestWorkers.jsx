import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../../Hooks/useAxiosPublic";

const BestWorkers = () => {
  const axiosPublic = useAxiosPublic();

  const { data: bestWorkers, isLoading } = useQuery({
    queryKey: ["best-workers"],
    queryFn: async () => {
      const { data } = await axiosPublic.get("/users/best-workers");
      return data;
    },
  });

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  return (
    <div className="my-10 w-11/12 mx-auto">
      <h2 className="text-3xl md:text-4xl text-center font-bold mb-8">
        Our Best Workers
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {bestWorkers.map((worker) => (
          <div
            key={worker._id}
            className="flex flex-col items-center bg-white rounded-lg shadow-lg p-6 transform transition hover:scale-105 hover:shadow-xl"
          >
            {/* Profile Picture */}
            <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-green-500">
              <img
                src={worker.image || "https://via.placeholder.com/150"}
                alt={worker.name}
                className="w-full h-full object-cover"
              />
            </div>
            {/* Name and Available Coins */}
            <div className="text-center mt-4">
              <div className="flex items-center justify-center space-x-2">
                <h3 className="text-xl font-semibold text-gray-800">
                  {worker.name}
                </h3>
                {/* Trophy Emoji */}
                <span className="text-yellow-400 text-xl">🏆</span>
              </div>
              <p className="text-sm text-gray-600 mt-1">
                Available Coins:{" "}
                <span className="text-green-500 font-bold">
                  {worker.availableCoins}
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestWorkers;
