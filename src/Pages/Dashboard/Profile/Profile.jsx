import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useRole from "../../../Hooks/useRole";

const ProfilePage = () => {
  const { user } = useAuth();
  const [role] = useRole();
  console.log(role);

  const userInfo = {
    image: "https://via.placeholder.com/150",
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1234567890",
    address: "123 Street, City, Country",
    role: "Admin",
  };

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
        <div className="flex items-center">
          <span className="font-medium w-28">Email:</span>
          <span className="text-gray-700">{user?.email}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium w-28">Phone:</span>
          <span className="text-gray-700">{userInfo.phone}</span>
        </div>
        <div className="flex items-center">
          <span className="font-medium w-28">Address:</span>
          <span className="text-gray-700">{userInfo.address}</span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
