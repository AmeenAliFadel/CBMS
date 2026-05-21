import { NavLink, Link, useNavigate } from "react-router-dom";
import { HiOutlineHeart, HiOutlineBell } from "react-icons/hi2";
import toast from "react-hot-toast";

import Logo from "../../assets/Logo.svg";
import HamburgerIcon from "../ui/HamburgerIcon";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { logoutUser } from "../../app/features/auth/authSlice";

type MobileMenuProps = {
  open: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  open,
  onClose,
}: MobileMenuProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { user, initialized } = useAppSelector(
    (state) => state.auth
  );

  const isAuthenticated = Boolean(user);

  if (!open) return null;

  const navLinks = [
    { title: "Browse Cars", path: "/cars" },
    { title: "Become a Host", path: "/become-host" },
    { title: "Profile", path: "/profile" },
    { title: "Contact", path: "/contact" },
  ];

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `w-full rounded-2xl px-4 py-3 text-sm font-medium transition-all duration-200 ${isActive
      ? "bg-[#4648D4] text-white shadow-md"
      : "text-[#464554] hover:bg-[#F3F4FF] hover:text-[#4648D4]"
    }`;

  const handleLogout = async () => {
    await dispatch(logoutUser());

    toast.success("Logged out successfully");

    onClose();

    navigate("/");
  };

  return (
    <div className="fixed inset-0 z-40 lg:hidden">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={onClose}
      />

      {/* Sidebar */}
      <aside className="absolute right-0 top-0 h-full w-[85%] max-w-sm bg-white shadow-2xl border-l border-black/5 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-black/5">
          <Link
            to="/"
            onClick={onClose}
            className="flex items-center"
          >
            <img src={Logo} alt="Logo" className="w-24" />
          </Link>

          <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center">
            <HamburgerIcon open={open} onClick={onClose} />
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col gap-6 overflow-y-auto">
          {/* Icons */}
          <div className="flex items-center gap-3">
            <Link
              to="/notes"
              onClick={onClose}
              className="w-11 h-11 rounded-2xl bg-background flex items-center justify-center text-primary hover:scale-105 transition"
            >
              <HiOutlineBell size={20} />
            </Link>

            <Link
              to="/favorites"
              onClick={onClose}
              className="w-11 h-11 rounded-2xl bg-background flex items-center justify-center text-primary hover:scale-105 transition"
            >
              <HiOutlineHeart size={20} />
            </Link>
          </div>

          {/* Navigation */}
          <nav className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                onClick={onClose}
                className={linkClass}
              >
                {link.title}
              </NavLink>
            ))}
          </nav>

          {/* Auth */}
          <div className="pt-2">
            {initialized && isAuthenticated ? (
              <div className="flex flex-col gap-3">
                <div className="rounded-2xl bg-[#F6F7FF] px-4 py-3 text-center text-sm font-semibold text-[#464554]">
                  {user?.name}
                </div>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl bg-[#464554] px-4 py-3 text-center text-sm font-medium text-white shadow-md hover:opacity-95 transition"
                >
                  Logout
                </button>
              </div>
            ) : initialized ? (
              <div className="grid grid-cols-2 gap-3">
                <NavLink
                  to="/login"
                  onClick={onClose}
                  className="rounded-2xl border border-border px-4 py-3 text-center text-sm font-medium text-primary hover:bg-[#F6F7FF] transition"
                >
                  Login
                </NavLink>

                <NavLink
                  to="/register"
                  onClick={onClose}
                  className="rounded-2xl bg-primary px-4 py-3 text-center text-sm font-medium text-white shadow-md hover:opacity-95 transition"
                >
                  Sign Up
                </NavLink>
              </div>
            ) : null}
          </div>
        </div>
      </aside>
    </div>
  );
}