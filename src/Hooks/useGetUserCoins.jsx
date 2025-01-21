import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "./useAxiosSecure";

const useGetUserCoins = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: coins,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: [user?.email, "coins"],
    enabled: !loading && !!user?.email,
    queryFn: async () => {
      const { data } = await axiosSecure.get(`/users/coins/${user?.email}`);
      if (data.coins === undefined) {
        return null;
      }
      return data.coins;
    },
  });

  return [coins, isLoading, refetch];
};

export default useGetUserCoins;
