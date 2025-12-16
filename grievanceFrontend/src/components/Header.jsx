import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHouse, faRegistered, faUser, faEye, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { faBars, faTimes, faUserTie } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white shadow-md shadow-amber-200">
      <div className="px-4 py-3 flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src="logo.jpeg"
            alt="Logo"
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-bold text-lg text-gray-700 hidden sm:block">
            Grievance
          </span>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden lg:flex items-center gap-4">
          <NavItem to="/" icon={faHouse} label="Home" />
          <NavItem to="/registerGrievance" icon={faRegistered} label="Register" />
          <NavItem to="/sendReminder" icon={faPaperPlane} label="Reminder" />
          <NavItem to="/viewStatus" icon={faEye} label="Status" />

          {user ? (
            <div className="flex items-center gap-3 ml-4">
              <div className="flex items-center gap-2 underline decoration-blue-500 underline-offset-4 text-gray-700 font-medium">
                <FontAwesomeIcon icon={faUserTie} />
                <span>{user.userName}</span>
              </div>
              <button
                onClick={logout}
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-1.5 rounded-lg text-sm"
              >
                Logout
              </button>
            </div>
          ) : (
            <NavItem to="/login" icon={faUser} label="Admin" />
          )}
        </ul>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setOpen(!open)}
          className="lg:hidden text-2xl text-gray-700"
        >
          <FontAwesomeIcon icon={open ? faTimes : faBars} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="lg:hidden bg-white border-t shadow-lg">
          <ul className="flex flex-col gap-2 p-4">
            <MobileItem to="/" label="Home" setOpen={setOpen} />
            <MobileItem to="/registerGrievance" label="Register Grievance" setOpen={setOpen} />
            <MobileItem to="/sendReminder" label="Send Reminder" setOpen={setOpen} />
            <MobileItem to="/viewStatus" label="View Status" setOpen={setOpen} />

            {user ? (
              <>
                <div className="flex items-center gap-2 underline underline-offset-4 decoration-blue-500 text-gray-700 mt-2">
                  <FontAwesomeIcon icon={faUserTie} />
                  <span>{user.userName}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setOpen(false);
                  }}
                  className="bg-red-500 text-white py-2 rounded-lg mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <MobileItem to="/login" label="Admin Login" setOpen={setOpen} />
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;

/* ---------- Reusable Components ---------- */

const NavItem = ({ to, icon, label }) => (
  <li>
    <Link
      to={to}
      className="flex items-center gap-2 px-3 py-2 rounded-lg shadow-lg text-gray-700 font-medium
     hover:bg-gray-100 transition"
    >
      <FontAwesomeIcon icon={icon} />
      <span>{label}</span>
    </Link>
  </li>
);

const MobileItem = ({ to, label, setOpen }) => (
  <li>
    <Link
      to={to}
      onClick={() => setOpen(false)}
      className="block w-full px-3 py-2 rounded-lg shadow text-gray-700
     hover:bg-gray-100"
    >
      {label}
    </Link>
  </li>
);