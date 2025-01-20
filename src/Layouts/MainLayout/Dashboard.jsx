import React, { useState } from "react";
import { FaBell } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
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
import { Toaster } from "react-hot-toast";
import useGetUserCoins from "../../Hooks/useGetUserCoins";

const Dashboard = () => {
  const { user, loading } = useAuth();
  const [role, isLoading] = useRole();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [coins] = useGetUserCoins();

  if (isLoading || loading)
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );

  const navLinks = (
    <>
      {/* Role-based navigation links */}
      {role === "worker" && (
        <>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/dashboard/worker-home"
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/dashboard/task-list"
            >
              <FaList className="mr-2" /> Task List
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/dashboard/my-submissions"
            >
              <FaTasks className="mr-2" /> My Submissions
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/dashboard/withdrawals"
            >
              <FaShoppingCart className="mr-2" /> Withdrawals
            </NavLink>
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
        </>
      )}
      {role === "admin" && (
        <>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/home"
            >
              <FaHome className="mr-2" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/manage-users"
            >
              <FaUsers className="mr-2" /> Manage users
            </NavLink>
          </li>
          <li>
            <NavLink
              className="py-2 px-4 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500 flex items-center"
              to="/manage-task"
            >
              <FaCogs className="mr-2" /> Manage task
            </NavLink>
          </li>
        </>
      )}
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
            <NavLink to="/" className="text-xl">
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 -ml-2 md:-ml-0">
                QuickTasker
              </span>
            </NavLink>
          </h1>
        </div>
        <div className="flex items-center space-x-4">
          {/* User Info */}
          <div className="text-right">
            <p className="font-medium text-gray-800">{user?.displayName}</p>
            <p className="text-sm text-gray-500">
              {role} |{" "}
              <span className="text-amber-500 font-bold">
                {coins ? coins : 0}
              </span>{" "}
              Coins
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
