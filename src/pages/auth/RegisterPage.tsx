import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import toast from "react-hot-toast";

import AuthDivider from "../../sections/authPageSections/AuthDivider";
import AuthInput from "../../sections/authPageSections/AuthInput";
import AuthLayout from "../../sections/authPageSections/AuthLayout";
import PasswordInput from "../../sections/authPageSections/PasswordInput";
import SocialAuthButtons from "../../sections/authPageSections/SocialAuthButtons";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { registerUser } from "../../app/features/auth/authSlice";
import {
  registerSchema,
  type RegisterFormValues,
} from "../../schemas/authSchemas";

export default function SignUpPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    },
  });

  const onSubmit = async (values: RegisterFormValues) => {
    try {
      const result = await dispatch(registerUser(values)).unwrap();

      toast.success(`Welcome, ${result.user.name}!`);
      reset();
      navigate("/");
    } catch (error: any) {
      toast.error(
        error || "Registration failed. Please try again."
      );
    }
  };

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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
        <AuthInput
          label="Full Name"
          placeholder="John Doe"
          id="name"
          autoComplete="name"
          error={errors.name?.message}
          {...register("name")}
        />

        <AuthInput
          label="Email Address"
          type="email"
          placeholder="name@company.com"
          id="email"
          autoComplete="email"
          error={errors.email?.message}
          {...register("email")}
        />

        <PasswordInput
          label="Password"
          id="password"
          autoComplete="new-password"
          error={errors.password?.message}
          {...register("password")}
        />

        <PasswordInput
          label="Confirm Password"
          id="password_confirmation"
          autoComplete="new-password"
          error={errors.password_confirmation?.message}
          {...register("password_confirmation")}
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-8 w-full rounded-xl bg-gradient-accent py-4 text-base font-semibold text-white transition hover:scale-[1.01] active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

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