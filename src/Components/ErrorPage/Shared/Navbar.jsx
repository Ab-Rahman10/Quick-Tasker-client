import { NavLink } from "react-router-dom";

const Navbar = () => {
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "bg-green-500 py-1.5 px-3 rounded-md text-white font-semibold"
              : "hover:text-green-500 hover:rounded-md"
          }
        >
          Home
        </NavLink>
      </li>

      <li>
        <NavLink
          to="/login"
          className={({ isActive }) =>
            isActive
              ? "bg-green-500 py-1.5 px-3 rounded-md text-white font-semibold"
              : "hover:text-green-500 hover:rounded-md"
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
              ? "bg-green-500 py-1.5 px-3 rounded-md text-white font-semibold"
              : "hover:text-green-500 hover:rounded-md"
          }
        >
          Registration
        </NavLink>
      </li>
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
              {navLinks}
            </ul>
          </div>
          <NavLink className="btn btn-ghost text-xl">
            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
              QuickTasker
            </span>
          </NavLink>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu-horizontal px-1 space-x-5 flex items-center">
            {navLinks}
          </ul>
        </div>
        <div className="navbar-end">
          <NavLink
            target="_blank"
            to="https://github.com/Ab-Rahman10"
            className="bg-green-500 text-white py-1.5 px-3 rounded-md hover:bg-green-500 transition duration-300"
            activeClassName="bg-teal-500"
          >
            Join as Developer
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default Navbar;
