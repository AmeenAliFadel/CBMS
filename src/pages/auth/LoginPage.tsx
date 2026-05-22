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
import { loginUser } from "../../app/features/auth/authSlice";
import { loginSchema, type LoginFormValues } from "../../schemas/authSchemas";

export default function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading } = useAppSelector((state) => state.auth);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: LoginFormValues) => {
    try {
      const result = await dispatch(loginUser(values)).unwrap();

      toast.success(`Welcome back, ${result.user.name}!`);
      reset();
      navigate("/");
    } catch (error: any) {
      toast.error(error || "Login failed. Please check your credentials.");
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

      <form onSubmit={handleSubmit(onSubmit)} className="mt-8 flex flex-col gap-5">
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
          autoComplete="current-password"
          error={errors.password?.message}
          {...register("password")}
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