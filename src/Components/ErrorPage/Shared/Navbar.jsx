import { Link, NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { TbLogout } from "react-icons/tb";
import useGetUserCoins from "../../../Hooks/useGetUserCoins";
import useRole from "../../../Hooks/useRole";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [coins, isLoading] = useGetUserCoins();
  const [role] = useRole();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <progress className="progress w-56"></progress>
      </div>
    );
  }

  const handleLogout = () => {
    logoutUser().then(() => {
      console.log("Log Out Successful");
    });
  };

  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? `font-bold border-b-2 border-green-500 transition duration-300`
              : ""
          }
        >
          Home
        </NavLink>
      </li>

      {user ? (
        <>
          <li>
            <NavLink
              to={`${
                role === "admin"
                  ? "/dashboard/admin-home"
                  : role === "buyer"
                  ? "/dashboard/buyer-home"
                  : "/dashboard/worker-home"
              }`}
              className={({ isActive }) =>
                isActive
                  ? `font-bold border-b-2 border-green-500 transition duration-300`
                  : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive
                  ? `font-bold border-b-2 border-green-500 transition duration-300`
                  : ""
              }
            >
              Login
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/signUp"
              className={({ isActive }) =>
                isActive
                  ? `font-bold border-b-2 border-green-500 transition duration-300`
                  : ""
              }
            >
              Registration
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <>
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown z-50">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <div
              tabIndex={0}
              className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
            >
              {user && (
                <div>
                  {" "}
                  {role !== "admin" && (
                    <div className="flex items-center space-x-4 bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
                      <button className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-amber-500">
                        <span>Available Coins:</span>
                        <span className="text-amber-500 font-bold">
                          {coins}
                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
              <div>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    isActive
                      ? `font-bold border-b-2 border-green-500 transition duration-300`
                      : ""
                  }
                >
                  Home
                </NavLink>
              </div>
              {user && (
                <div>
                  <NavLink
                    to={`${
                      role === "admin"
                        ? "/dashboard/admin-home"
                        : role === "buyer"
                        ? "/dashboard/buyer-home"
                        : "/dashboard/worker-home"
                    }`}
                    className={({ isActive }) =>
                      isActive
                        ? `font-bold border-b-2 border-green-500 transition duration-300`
                        : ""
                    }
                  >
                    Dashboard
                  </NavLink>
                </div>
              )}
              {user ? (
                <div>
                  <button
                    onClick={handleLogout}
                    className="font-bold text-red-400"
                  >
                    Log Out <TbLogout className="inline-flex text-xl ml-2" />
                  </button>
                </div>
              ) : (
                <>
                  {" "}
                  <div>
                    <NavLink
                      to="/login"
                      className={({ isActive }) =>
                        isActive
                          ? `font-bold border-b-2 border-green-500 transition duration-300`
                          : ""
                      }
                    >
                      Login
                    </NavLink>
                  </div>
                  <div>
                    <NavLink
                      to="/signUp"
                      className={({ isActive }) =>
                        isActive
                          ? `font-bold border-b-2 border-green-500 transition duration-300`
                          : ""
                      }
                    >
                      Registration
                    </NavLink>
                  </div>
                </>
              )}
            </div>
          </div>
          <Link to="/" className="text-xl">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 -ml-2 md:ml-3">
              QuickTasker
            </span>
          </Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 space-x-10 flex items-center">
            {navLinks}
            {user && (
              <li>
                <button
                  onClick={handleLogout}
                  className="py-1.5 px-3 bg-red-500 text-white rounded-md transition duration-300"
                >
                  Log Out
                </button>
              </li>
            )}
          </ul>
        </div>
        <div className="navbar-end space-x-2">
          {user && (
            <div className="hidden md:block">
              {role === "admin" ? null : (
                <li className="flex items-center space-x-4 bg-gray-100 px-4 py-2 rounded-lg shadow-sm">
                  <button className="flex items-center space-x-2 text-gray-800 font-semibold hover:text-amber-500">
                    <span>Available Coins:</span>
                    <span className="text-amber-500 font-bold">{coins}</span>
                  </button>
                </li>
              )}
            </div>
          )}
          <NavLink
            target="_blank"
            to="https://github.com/Programming-Hero-Web-Course4/b10a12-client-side-Ab-Rahman10"
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-500 transition duration-300 font-normal md:font-semibold whitespace-nowrap text-sm md:text-base"
          >
            Join as Developer
          </NavLink>
          {user?.photoURL && (
            <img
              title={user?.displayName}
              className="w-10 rounded-full"
              src={user?.photoURL}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Navbar;
