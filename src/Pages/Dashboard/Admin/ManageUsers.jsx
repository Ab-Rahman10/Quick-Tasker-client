import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";

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

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

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
    if (!selectedRole.role) {
      document.getElementById("my_modal_5").close();
      return toast.error("Please select a role.");
    } else {
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
        // console.log(err);
      }
    }

    document.getElementById("my_modal_5").close();
  };

  // delete user
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const { data } = await axiosSecure.delete(`/user-delete/${id}`);
          if (data.deletedCount > 0) {
            Swal.fire({
              title: "Deleted!",
              text: "User has been deleted.",
              icon: "success",
            });
            refetch();
          }
        } catch (err) {
          // console.log(err);
        }
      }
    });
  };

  return (
    <div className="mt-5 p-6 ">
      <h1 className="text-3xl font-bold mb-5 text-center">Manage users</h1>
      <div className="overflow-x-auto">
        <table className="table border">
          {/* head */}
          <thead className="bg-green-500 text-white border">
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
              <tr key={user._id} data-aos="fade-up">
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
                  <span className="text-amber-500">{user.availableCoins}</span>{" "}
                </td>
                <th className="flex flex-col gap-2 md:flex md:flex-row">
                  <button
                    onClick={() => handleDelete(user._id)}
                    className="py-1 px-3 rounded-md bg-red-500 text-white font-medium"
                  >
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
