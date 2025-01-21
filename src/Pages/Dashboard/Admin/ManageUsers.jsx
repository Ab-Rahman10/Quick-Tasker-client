import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState } from "react";
import toast from "react-hot-toast";

const ManageUsers = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [userId, setUserId] = useState(null);

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

  // Update role
  const handleOpenModal = (userId) => {
    document.getElementById("my_modal_5").showModal();
    setUserId(userId);
  };

  const handleRole = async (e) => {
    e.preventDefault();

    const selectedRole = { role: e.target.role.value };
    try {
      // now change in db
      await axiosSecure
        .patch(`/user-role-update/${userId}`, selectedRole)
        .then((res) => {
          if (res.data.modifiedCount > 0) {
            refetch();
            toast.success("User role updated successfully!");
          }
        });
    } catch (err) {
      console.log(err);
    }

    document.getElementById("my_modal_5").close();
  };

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Image</th>
              <th>Email</th>
              <th>Role</th>
              <th>Coin</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user.image} alt={user.name} />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{user.name}</div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>{user.role}</td>
                <td>
                  <span className="text-amber-500">${user.availableCoins}</span>{" "}
                  USD
                </td>
                <th className="space-x-2">
                  <button className="py-1 px-3 rounded-md bg-red-500 text-white font-medium">
                    Remove
                  </button>
                  <button
                    onClick={() => handleOpenModal(user._id)}
                    className="py-1 px-3 rounded-md bg-green-500 text-white font-medium"
                  >
                    Update
                  </button>
                  {/* Open the modal using document.getElementById('ID').showModal() method */}

                  <dialog
                    id="my_modal_5"
                    className="modal modal-bottom sm:modal-middle"
                  >
                    <form
                      onSubmit={handleRole}
                      className="border border-gray-300 rounded-md shadow-md p-4 w-64 bg-white"
                    >
                      <p className="font-medium text-gray-700 mb-2">
                        Select Role
                      </p>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="admin"
                            className="radio mr-2"
                          />
                          Admin
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="buyer"
                            className="radio mr-2"
                          />
                          Buyer
                        </label>
                        <label className="flex items-center">
                          <input
                            type="radio"
                            name="role"
                            value="worker"
                            className="radio mr-2"
                          />
                          Worker
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="mt-4 py-2 px-4 bg-green-600 text-white rounded-md hover:bg-green-700 transition"
                      >
                        Update Role
                      </button>
                    </form>
                  </dialog>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ManageUsers;
