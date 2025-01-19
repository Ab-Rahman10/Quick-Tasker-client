import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUserCoins = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: coins,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "coins"],
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/coins/${user?.email}`);

      return data.coins;
    },
  });

  return [coins, isLoading, refetch];
};

export default useGetUserCoins;
