import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { HiMenu, HiX } from "react-icons/hi";

import Logo from "../../assets/Logo.svg";
import note from "../../assets/navbarLogos/note.svg";
import love from "../../assets/navbarLogos/love.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const location = useLocation();

  const navLinks = [
    {
      title: "Browse Cars",
      path: "/cars",
    },
    {
      title: "Become a Host",
      path: "/become-host",
    },
    {
      title: "Profile",
      path: "/profile",
    },
    {
      title: "Contact",
      path: "/contact",
    },
  ];

  const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-medium transition-colors duration-200 hover:text-[#4648D4] ${isActive ? "text-[#4648D4] border-b-2 border-b-[#4648D4] " : "text-[#464554]"
    }`;

  const authButtonClass = (path: string, isActive: boolean) => {
    const isDefaultRegister =
      path === "/register" &&
      location.pathname !== "/login";

    return `py-2 px-6 rounded-3xl text-sm font-normal transition-all duration-200 ${isActive || isDefaultRegister
        ? "bg-[#4648D4] text-white"
        : "text-[#464554] hover:bg-[#4648D4] hover:text-white"
      }`;
  };

  return (
    <nav className="px-4 lg:px-10 xl:px-20 py-4 flex justify-between items-center relative">

      {/* Left Side */}
      <div className="flex items-center gap-4 lg:gap-6 xl:gap-10">

        {/* Logo */}
        <NavLink to="/">
          <img
            src={Logo}
            alt="Logo"
            className="w-24 lg:w-28"
          />
        </NavLink>

        {/* Desktop Links */}
        <ul className="hidden lg:flex gap-4 lg:gap-6 justify-between   ">

          {navLinks.map((link, index) => (
            <li key={index}>

              <NavLink
                to={link.path}
                className={navLinkClass}
              >
                {link.title}
              </NavLink>

            </li>
          ))}

        </ul>
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-3 lg:gap-4">

        {/* Icons */}
        <div className="hidden sm:flex items-center gap-1">
          <img
            src={note}
            alt="note"
            className="w-5 h-5 lg:w-6 lg:h-6"
          />

          <img
            src={love}
            alt="love"
            className="w-5 h-5 lg:w-6 lg:h-6"
          />
        </div>

        {/* Desktop Auth Buttons */}
        <div className="hidden lg:flex items-center gap-2">

          <NavLink to="/login">
            {({ isActive }) => (
              <span className={authButtonClass("/login", isActive)}>
                Login
              </span>
            )}
          </NavLink>

          <NavLink to="/register">
            {({ isActive }) => (
              <span className={authButtonClass("/register", isActive)}>
                Sign Up
              </span>
            )}
          </NavLink>

        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden text-[#464554]"
        >
          {isOpen ? <HiX size={28} /> : <HiMenu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-[calc(100%-20px)] bg-white border-2 border-[#4648D4] rounded-3xl mx-2.5 shadow-lg lg:hidden py-6 px-4 flex flex-col  gap-5 z-50">

          {/* Mobile Links */}
          <ul className="flex flex-col items-center gap-4">

            {navLinks.map((link, index) => (
              <li key={index}>

                <NavLink
                  to={link.path}
                  className={navLinkClass}
                  onClick={() => setIsOpen(false)}
                >
                  {link.title}
                </NavLink>

              </li>
            ))}

          </ul>

          {/* Mobile Auth */}
          <div className="flex flex-col gap-3">

            <NavLink
              to="/login"
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <span
                  className={`${authButtonClass(
                    "/login",
                    isActive
                  )} block text-center`}
                >
                  Login
                </span>
              )}
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setIsOpen(false)}
            >
              {({ isActive }) => (
                <span
                  className={`${authButtonClass(
                    "/register",
                    isActive
                  )} block text-center`}
                >
                  Sign Up
                </span>
              )}
            </NavLink>

          </div>
        </div>
      )}
    </nav>
  );
}