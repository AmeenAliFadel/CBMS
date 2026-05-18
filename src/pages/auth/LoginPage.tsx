import { Link } from "react-router-dom";

import AuthDivider from "../../sections/authPageSections/AuthDivider";
import AuthInput from "../../sections/authPageSections/AuthInput";
import AuthLayout from "../../sections/authPageSections/AuthLayout";
import PasswordInput from "../../sections/authPageSections/PasswordInput";
import SocialAuthButtons from "../../sections/authPageSections/SocialAuthButtons";

export default function LoginPage() {
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

      <div className="mt-8 flex flex-col gap-5">

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
      </div>

      <button className="mt-8 w-full rounded-xl bg-gradient-accent py-4 text-base font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99]">
        Sign In
      </button>

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