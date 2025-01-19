import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { TbLogout } from "react-icons/tb";
import useGetUserCoins from "../../../Hooks/useGetUserCoins";

const Navbar = () => {
  const { user, logoutUser } = useAuth();
  const [coins] = useGetUserCoins();

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
              to="/dashboard"
              className={({ isActive }) =>
                isActive
                  ? `font-bold border-b-2 border-green-500 transition duration-300`
                  : ""
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li className="flex items-center space-x-4">
            <button className="font-bold">
              Available Coins:{" "}
              <span className="text-amber-500 font-bold">{coins}</span>
            </button>
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
              <div className="flex items-center space-x-4 mb-5 border-b-2">
                <button className="font-bold">
                  Available Coins:{" "}
                  <span className="text-amber-500 font-bold">150</span>
                </button>
              </div>
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
              <div>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    isActive
                      ? `font-bold border-b-2 border-green-500 transition duration-300`
                      : ""
                  }
                >
                  Dashboard
                </NavLink>
              </div>
              {user && (
                <div>
                  <button onClick={handleLogout} className="font-bold">
                    Log Out <TbLogout className="inline-flex text-xl ml-2" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <NavLink to="/" className="text-xl">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 -ml-2 md:-ml-0">
              QuickTasker
            </span>
          </NavLink>
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
          <NavLink
            target="_blank"
            to="https://github.com/Ab-Rahman10"
            className="bg-green-500 text-white py-1.5 px-3 rounded-md hover:bg-green-500 transition duration-300 font-normal md:font-semibold whitespace-nowrap text-sm md:text-base"
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
