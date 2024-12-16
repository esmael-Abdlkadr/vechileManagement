import React, { useState } from "react";
import { FiBell, FiSearch, FiUser, FiChevronDown } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useAuth from "../store/useAuth";
import Modal from "./Modal";
import UpdatePassword from "../sections/ChangePassword";
import EditProfile from "../sections/EditProfile";

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { setIsAuthenticated, clearUser } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isChangePasswordModalOpen, setIsChangePasswordOpen] = useState(false);
  const [isEditProfileModalOpen, setIsEditProfileModalOpen] = useState(false);

  // Toggle dropdown visibility
  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };
  const HandleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
    clearUser();

    navigate("/signin", { replace: true });
    // clear the history stack.
    window.history.replaceState(null, "", "/signin");
  };

  return (
    <nav className="flex items-center justify-between bg-gray-800 text-white px-4 py-2 shadow">
      {isChangePasswordModalOpen && (
        <Modal
          isOpen={isChangePasswordModalOpen}
          title="Change Password"
          onClose={() => setIsChangePasswordOpen(false)}
        >
          Change Password Modal
          <UpdatePassword onClose={() => setIsChangePasswordOpen(false)} />
        </Modal>
      )}
      {isEditProfileModalOpen && (
        <Modal
          isOpen={isEditProfileModalOpen}
          title="Edit Profile"
          onClose={() => setIsEditProfileModalOpen(false)}
        >
          <EditProfile onClose={() => setIsEditProfileModalOpen(false)} />
        </Modal>
      )}

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

      <div className="flex items-center space-x-4  ">
        <FiBell className="text-xl hover:text-gray-300 cursor-pointer" />
        <div
          className="relative flex items-center space-x-2 cursor-pointer"
          onClick={toggleDropdown}
        >
          <FiUser className="text-xl" />
          <span className="hidden md:inline">Admin</span>
          <FiChevronDown className="text-xl ml-1" />

          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="absolute right-0 top-3 w-48 bg-gray-700 rounded-lg shadow-lg mt-4">
              <ul className="text-white">
                <button
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => setIsEditProfileModalOpen(true)}
                >
                  Edit Profile
                </button>
                <button
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={() => setIsChangePasswordOpen(true)}
                >
                  Change Password
                </button>
                <button
                  className="px-4 py-2 hover:bg-gray-600 cursor-pointer"
                  onClick={HandleLogout}
                >
                  Logout
                </button>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
