import { Link } from "react-router-dom";

import AuthDivider from "../../sections/authPageSections/AuthDivider";
import AuthInput from "../../sections/authPageSections/AuthInput";
import AuthLayout from "../../sections/authPageSections/AuthLayout";
import PasswordInput from "../../sections/authPageSections/PasswordInput";
import SocialAuthButtons from "../../sections/authPageSections/SocialAuthButtons";

export default function SignUpPage() {
  return (
    <AuthLayout
      heading="Drive Your Ambition."
      description="Create your account and unlock access to the world's most exclusive fleet."
    >
      <div>

        <h1 className="mb-2 text-3xl font-bold text-text-primary">
          Create Account
        </h1>

        <p className="text-sm text-text-secondary">
          Sign up to get exclusive access to our luxury fleet.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-5">

        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          id="name"
        />

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          id="email"
        />

        <PasswordInput
          label="Password"
          id="password"
        />

        <PasswordInput
          label="Confirm Password"
          id="confirm-password"
        />
      </div>

      <button className="mt-8 w-full rounded-xl bg-gradient-accent py-4 text-base font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99]">
        Sign Up
      </button>

      <AuthDivider />

      <SocialAuthButtons />

      <p className="mt-7 text-center text-sm text-text-secondary">
        Already have an account?{" "}

        <Link
          to="/login"
          className="font-semibold text-primary transition hover:text-primary-dark"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}