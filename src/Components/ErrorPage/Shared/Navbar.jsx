import { NavLink } from "react-router-dom";
import useAuth from "../../../Hooks/useAuth";
import { TbLogout } from "react-icons/tb";

const Navbar = () => {
  const { user, logoutUser } = useAuth();

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
        <></>
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
          <div className="dropdown">
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
            <ul
              tabIndex={0}
              className="menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow space-y-2"
            >
              {user && (
                <li>
                  <button
                    onClick={handleLogout}
                    className="font-bold border-b-2 border-red-500 transition duration-300"
                  >
                    Log Out <TbLogout className="inline-flex text-xl ml-2" />
                  </button>
                </li>
              )}
              {navLinks}
            </ul>
          </div>
          <NavLink className="btn btn-ghost text-xl">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400 -ml-8 md:-ml-0">
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
