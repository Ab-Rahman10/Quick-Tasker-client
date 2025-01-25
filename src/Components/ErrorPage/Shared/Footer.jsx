import React from "react";
import { FaLinkedin, FaFacebook, FaGithub } from "react-icons/fa";
import { Link, NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#282828] text-white py-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        {/* Logo */}
        <Link to="/" className="btn btn-ghost text-xl">
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-400">
            QuickTasker
          </span>
        </Link>

        {/* Social Media Icons */}
        <div className="flex space-x-4">
          <Link
            to="https://www.linkedin.com/in/your-profile"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaLinkedin size={24} />
          </Link>
          <Link
            to="https://www.facebook.com/ab.rahman.253080/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaFacebook size={24} />
          </Link>
          <Link
            to="https://github.com/Ab-Rahman10"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition duration-300"
          >
            <FaGithub size={24} />
          </Link>
        </div>
      </div>
      <p className="text-center text-gray-500 text-sm mt-4">
        © {new Date().getFullYear()} QuickTasker. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
