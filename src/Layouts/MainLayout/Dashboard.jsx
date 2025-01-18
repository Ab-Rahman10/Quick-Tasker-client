import React from "react";
import { NavLink } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <header className="p-5 shadow-md">
        <NavLink to="/" className="text-xl">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            QuickTasker
          </span>
        </NavLink>
      </header>

      {/* Sidebar + Main Content */}
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-md hidden md:block">
          <nav className="p-5">
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500"
                >
                  Overview
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500"
                >
                  Tasks
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500"
                >
                  Reports
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-md text-gray-700 hover:bg-green-100 hover:text-green-500"
                >
                  Profile
                </a>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-5">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {/* Card 1 */}
            <div className="p-5 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-500 mb-3">
                Completed Tasks
              </h2>
              <p className="text-gray-600">120 tasks completed this month.</p>
            </div>

            {/* Card 2 */}
            <div className="p-5 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-500 mb-3">
                Pending Tasks
              </h2>
              <p className="text-gray-600">25 tasks are pending.</p>
            </div>

            {/* Card 3 */}
            <div className="p-5 bg-white rounded-lg shadow-md">
              <h2 className="text-xl font-bold text-green-500 mb-3">
                Team Performance
              </h2>
              <p className="text-gray-600">
                Your team achieved 85% efficiency.
              </p>
            </div>
          </div>

          {/* Chart or Additional Section */}
          <div className="mt-8 p-5 bg-white rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-green-500 mb-4">
              Weekly Progress
            </h2>
            <div className="h-48 bg-gray-200 flex items-center justify-center">
              <span className="text-gray-500">[Chart Placeholder]</span>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
