import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FiHome, FiTruck, FiSettings, FiUser } from "react-icons/fi";

const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div
      className={`flex ${
        isOpen ? "w-64" : "w-16"
      } bg-gray-800 min-h-screen transition-all`}
    >
      <div className="flex flex-col justify-between w-full">
        {/* Toggle Button */}
        <button
          className="p-2 text-white hover:bg-gray-700"
          onClick={() => setIsOpen(!isOpen)}
        >
          ☰
        </button>

        {/* Navigation Items */}
        <nav className="flex-1">
          <ul className="space-y-2">
            <li>
              <Link
                to="/dashboard"
                className="flex items-center p-3 text-white hover:bg-gray-700"
              >
                <FiHome className="mr-2" />
                {isOpen && <span>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/vehicles"
                className="flex items-center p-3 text-white hover:bg-gray-700"
              >
                <FiTruck className="mr-2" />
                {isOpen && <span>Vehicles</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/users"
                className="flex items-center p-3 text-white hover:bg-gray-700"
              >
                <FiUser className="mr-2" />
                {isOpen && <span>Users</span>}
              </Link>
            </li>
            <li>
              <Link
                to="/settings"
                className="flex items-center p-3 text-white hover:bg-gray-700"
              >
                <FiSettings className="mr-2" />
                {isOpen && <span>Settings</span>}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
