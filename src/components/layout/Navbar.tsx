import { useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import Logo from "../../assets/Logo.svg";
import note from "../../assets/navbarLogos/note.svg";
import love from "../../assets/navbarLogos/love.svg";
import HamburgerIcon from "../ui/HamburgerIcon";
import MobileMenu from "../common/MobileMenu";
import {navLinks} from "../../data/navBar/NavLinkData"; 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
  `relative px-3 py-2 rounded-xl text-sm font-medium transition-all duration-300 ease-out

   ${isActive ? "text-[#6C4EFF]" : "text-[#464554]"}
   hover:text-[#6C4EFF]
   hover:-translate-y-[1px]
   /* soft background pill */
   before:content-[''] before:absolute before:inset-0
   before:rounded-xl before:bg-[#4648D4]/10
   before:scale-0 before:opacity-0
   before:transition-all before:duration-300
   hover:before:scale-100 hover:before:opacity-100
   ${isActive ? "before:scale-100 before:opacity-100" : ""}
   overflow-hidden`;

  const authButtonClass = (isActive: boolean, filled?: boolean) =>
    `rounded-3xl px-6 py-2 text-sm font-medium transition-all duration-200 ${
      filled || isActive
        ? "bg-[#4648D4] text-white shadow-md"
        : "text-[#464554] hover:bg-[#F6F7FF] hover:text-[#4648D4]"
    }`;

  return (
    <>
      <nav className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-black/5">
        <div className="px-4 lg:px-10 xl:px-20 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4 lg:gap-8">
            <NavLink to="/" className="flex items-center">
              <img src={Logo} alt="Logo" className="w-24 lg:w-28" />
            </NavLink>

            <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <NavLink to={link.path} className={navLinkClass}>
                    {link.title}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="flex items-center gap-2 lg:gap-3">
<div className="hidden sm:flex items-center gap-3">
  {/* Notifications */}
  <Link to={'notes'} className="group nav-icon-btn nav-icon-btn-primary cursor-pointer">
    <span className="nav-icon-ripple group-hover:scale-[2.5]" />
    <span className="nav-icon-border group-hover:border-white/20" />
    <img
      src={note}
      alt="notes"
      className="
        w-6 h-6 lg:w-7 lg:h-7
    nav-icon-img
        nav-icon-img
        group-hover:rotate-12
        group-hover:scale-110
        group-hover:brightness-0
        group-hover:invert
      "
    />
  </Link>
  {/* Favorites */}
  <Link to={'favorites'} className="group nav-icon-btn nav-icon-btn-danger cursor-pointer">
    <span className="nav-icon-ripple group-hover:scale-[2.5]" />
    <span className="nav-icon-border group-hover:border-white/20" />
    <img
      src={love}
      alt="favorites"
      className="
        nav-icon-img
        group-hover:scale-125
        group-hover:-rotate-12
        group-hover:brightness-0
        group-hover:invert
      "
    />
  </Link>
</div>
            <div className="hidden lg:flex items-center gap-2">
              <NavLink to="/login">
                {({ isActive }) => (
                  <span className={authButtonClass(isActive)} aria-current={isActive ? "page" : undefined}>
                    Login
                  </span>
                )}
              </NavLink>

              <NavLink to="/register">
                {({ isActive }) => (
                  <span className={authButtonClass(isActive, true)} aria-current={isActive ? "page" : undefined}>
                    Sign Up
                  </span>
                )}
              </NavLink>
            </div>

            <HamburgerIcon open={isOpen} onClick={() => setIsOpen((prev) => !prev)} />
          </div>
        </div>
      </nav>

      <MobileMenu open={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}