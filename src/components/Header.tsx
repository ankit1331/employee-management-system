import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaUserCircle } from "react-icons/fa";
import { logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  user: null | { username: string; role: "admin" | "member" };
}

const Header: React.FC<HeaderProps> = ({ user }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-2xl font-bold">
          <a href="/">Employee Management</a>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:text-gray-300">
                Home
              </a>
            </li>
            {user && (
              <FaUserCircle
                className="text-gray-700 text-3xl"
                onClick={toggleMenu}
              />
            )}
            {menuOpen && (
              <div className="absolute right-0 mt-12 w-48 bg-white border rounded shadow-lg py-2">
                <div className="px-4 py-2 text-gray-700">{user?.username}</div>
                <div className="border-t"></div>
                <button
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </div>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
