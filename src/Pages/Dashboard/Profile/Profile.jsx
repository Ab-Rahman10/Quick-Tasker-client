import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";
import useGetUserCoins from "../../../Hooks/useGetUserCoins";

const ProfilePage = () => {
  const { user } = useAuth();
  const [role] = useRole();
  const [coins] = useGetUserCoins();

  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md mt-10">
      <div className="flex flex-col items-center">
        <img
          src={user?.photoURL}
          alt="User Profile"
          className="w-32 h-32 rounded-full border-4 border-green-500"
        />
        <h2 className="text-xl font-semibold mt-4">{user?.displayName}</h2>
        <p className="text-gray-600">{role}</p>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <span className="font-medium w-28">Email:</span>
          <span className="text-gray-700">{user?.email}</span>
        </div>
        {role !== "admin" && (
          <div className="flex items-center justify-between">
            <span className="font-medium w-28 whitespace-nowrap">
              Available Coins:
            </span>
            <span className="text-amber-500">{coins}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
