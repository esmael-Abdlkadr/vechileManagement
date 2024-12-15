import React from "react";
import { FiBell, FiSearch, FiUser } from "react-icons/fi";

const Navbar: React.FC = () => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow">
      {/* App Logo */}
      <div className="flex items-center">
        <h1 className="text-xl font-bold">VehicleManager</h1>
      </div>

      {/* Search Bar */}
      <div className="hidden md:flex items-center bg-gray-700 rounded-lg px-3 py-1">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-transparent focus:outline-none text-white"
        />
      </div>

      {/* Icons (Notifications, User Profile) */}
      <div className="flex items-center space-x-4">
        <FiBell className="text-xl hover:text-gray-300 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <FiUser className="text-xl" />
          <span className="hidden md:inline">Admin</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
