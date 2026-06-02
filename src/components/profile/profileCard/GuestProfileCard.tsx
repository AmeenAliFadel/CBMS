import { Link } from "react-router-dom";
import { FaCircleUser } from "react-icons/fa6";
export default function GuestProfileCard() {
  return (
    <div className="bg-surface rounded-2xl p-6 flex flex-col items-center gap-4">
      <FaCircleUser className="text-7xl text-text-secondary" />

      <div className="text-center">
        <h2 className="text-xl font-bold text-text-primary">
          Guest Member
        </h2>

        <p className="text-sm text-text-secondary mt-2">
          Sign in or create an account to access your profile,
          manage bookings and save your favorite vehicles.
        </p>
      </div>

      <div className="flex gap-3 w-full">
        <Link
          to="/login"
          className="flex-1 py-2 rounded-lg border border-primary text-center"
        >
          Login
        </Link>

        <Link
          to="/register"
          className="flex-1 py-2 rounded-lg bg-primary text-center text-white"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}