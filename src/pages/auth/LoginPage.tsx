import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import AuthDivider from "../../sections/authPageSections/AuthDivider";
import AuthInput from "../../sections/authPageSections/AuthInput";
import AuthLayout from "../../sections/authPageSections/AuthLayout";
import PasswordInput from "../../sections/authPageSections/PasswordInput";
import SocialAuthButtons from "../../sections/authPageSections/SocialAuthButtons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { loginUser } from "../../app/features/auth/authSlice";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (field: "email" | "password", value: string) => {
    setForm((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!form.email.trim() || !form.password.trim()) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const result = await dispatch(loginUser(form)).unwrap();

      toast.success(`Welcome back, ${result.user.name}!`);

      if (result.role?.includes("admin")) {
        navigate("/");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error("Login failed. Please check your credentials.");
    }
  };

  return (
    <AuthLayout
      heading="Redefining the road."
      description="Access the world's most exclusive fleet with the touch of a button."
    >
      <div>
        <h1 className="mb-2 text-3xl font-bold text-text-primary">
          Welcome Back
        </h1>

        <p className="text-sm text-text-secondary">
          Sign in to manage your luxury fleet access.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mt-8 flex flex-col gap-5">
        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          id="email"
          value={form.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />

        <PasswordInput
          label="Password"
          id="password"
          value={form.password}
          onChange={(e) => handleChange("password", e.target.value)}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-accent py-4 text-base font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <AuthDivider />
      <SocialAuthButtons />

      <p className="mt-7 text-center text-sm text-text-secondary">
        Don&apos;t have an account?{" "}
        <Link
          to="/register"
          className="font-semibold text-primary transition hover:text-primary-dark"
        >
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
}