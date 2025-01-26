import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import useRole from "../../Hooks/useRole";
import useAuth from "../../Hooks/useAuth";
import {
  FaHome,
  FaList,
  FaTasks,
  FaShoppingCart,
  FaUsers,
  FaCogs,
} from "react-icons/fa";
import { RiMenu2Line } from "react-icons/ri";
import toast, { Toaster } from "react-hot-toast";
import useGetUserCoins from "../../Hooks/useGetUserCoins";
import { TbLogout } from "react-icons/tb";

const Dashboard = () => {
  const { user, loading, logoutUser } = useAuth();
  const [role, isLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [coins] = useGetUserCoins();
  const navigate = useNavigate();

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  // Logout
  const handleLogout = () => {
    logoutUser();
    toast.success("Logout successfully!");
    navigate("/login");
  };

  const navLinks = (
    <>
      {/* Role-based navigation links */}
      {role === "worker" && (
        <>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/worker-home"
              >
                <FaHome className="mr-2" /> Home
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/task-list"
              >
                <FaList className="mr-2" /> Task List
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/my-submissions"
              >
                <FaTasks className="mr-2" /> My Submissions
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/withdrawals"
              >
                <FaShoppingCart className="mr-2" /> Withdrawals
              </NavLink>
            </button>
          </li>
        </>
      )}

      {role === "buyer" && (
        <>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/buyer-home"
              >
                <FaHome className="mr-2" /> Home
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/add-new-task"
              >
                <FaTasks className="mr-2" /> Add new Task
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/my-tasks"
              >
                <FaList className="mr-2" /> My Tasks
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/purchase-coin"
              >
                <FaShoppingCart className="mr-2" /> Purchase Coin
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/payment-history"
              >
                <FaShoppingCart className="mr-2" /> Payment History
              </NavLink>
            </button>
          </li>
        </>
      )}
      {role === "admin" && (
        <>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/admin-home"
              >
                <FaHome className="mr-2" /> Home
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/manage-users"
              >
                <FaUsers className="mr-2" /> Manage users
              </NavLink>
            </button>
          </li>
          <li>
            <button onClick={() => setIsSidebarOpen(false)}>
              <NavLink
                className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
                to="/dashboard/manage-tasks"
              >
                <FaCogs className="mr-2" /> Manage tasks
              </NavLink>
            </button>
          </li>
        </>
      )}
      <div className="divider"></div>

      {/* Shared Nav */}
      <li>
        <NavLink
          className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
          to="/"
        >
          <FaHome className="mr-2" /> Home
        </NavLink>
      </li>
      <li>
        <button
          onClick={handleLogout}
          className="py-2 px-4 rounded-md text-gray-700 hover:bg-red-100 hover:text-red-500 flex items-center"
        >
          <TbLogout className="mr-2" /> Log out
        </button>
      </li>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <Toaster />
      {/* Header Section */}
      <header className="flex justify-between items-center bg-white shadow-md p-4">
        <div className="flex items-center ">
          {/* Sidebar Toggle Button for Mobile */}
          <button
            className="lg:hidden p-2"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <span className="text-2xl">
              <RiMenu2Line />
            </span>
          </button>
          <h1 className="text-2xl font-bold text-green-500">
            <Link to="/" className="text-xl">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 -ml-2 md:-ml-0">
                QuickTasker
              </span>
            </Link>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="text-right">
            <p className="font-medium text-gray-800">{user?.displayName}</p>
            <p className="text-sm text-gray-500">
              {role} |{" "}
              <span className="text-amber-500 font-bold py-0.5 px-4 rounded-md bg-amber-100">
                {role === "admin" ? null : coins ? coins : 0}
              </span>{" "}
              {/* {role === "admin" ? null : "Coins"} */}
            </p>
          </div>
          <img
            src={user?.photoURL}
            alt="User"
            className="w-10 rounded-full border border-gray-300"
          />
          <FaBell
            className="text-gray-500 hover:text-green-500 cursor-pointer"
            size={20}
          />
        </div>
      </header>

      {/* Main Content */}
      <div className="flex w-full">
        {/* Sidebar Navigation */}
        <aside
          className={`lg:block ${
            isSidebarOpen
              ? "absolute top-20 left-0 w-full bg-green-50 p-4 shadow-md z-50"
              : "hidden"
          } lg:w-64 bg-green-50 p-4 shadow-md`}
        >
          <nav>
            <ul className="space-y-4">{navLinks}</ul>
          </nav>
        </aside>

        {/* Dashboard Main Content Area */}
        <div className="lg:w-2/3 w-full  min-h-[calc(100vh-132px)]">
          <Outlet></Outlet>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-[#282828] text-gray-400 text-center p-4">
        <p>&copy; 2025 QuickTasker. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default Dashboard;
