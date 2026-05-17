import { useState } from 'react'
import { FaGoogle, FaApple } from 'react-icons/fa';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import carImageSrc from "../../assets/HostPageImages/hostimage.jpg";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="h-screen overflow-hidden bg-background">

      {/* Full Screen Layout */}
      <div className="w-full h-full flex flex-col md:flex-row">

        {/* LEFT PANEL */}
        <div className="hidden md:flex w-1/2 h-full relative">

          {/* Image */}
          <img
            src={carImageSrc}
            alt="Luxury car"
            className="absolute inset-0 w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-slate-900/75" />

          {/* Content */}
          <div className="relative z-10 flex flex-col p-12 h-full">
            <p className="text-2xl font-bold text-white tracking-wider uppercase">
              LuxeDrive
            </p>

            <div className="flex flex-col justify-center grow gap-5">
              <h2 className="font-extrabold text-white text-5xl leading-tight drop-shadow-md">
                Redefining <br /> the road.
              </h2>

              <p className="text-white/70 text-lg leading-relaxed max-w-md">
                Access the world's most exclusive fleet with the touch of a
                button. Experience peerless performance.
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="w-full md:w-1/2 h-full bg-surface flex items-center justify-center overflow-y-auto px-6 py-10">

          {/* FORM CONTAINER */}
          <div className="w-full max-w-md flex flex-col">

            {/* Header */}
            <div className="mb-8">
              <h1 className='text-3xl font-bold text-text-primary mb-2'>
                Welcome Back
              </h1>

              <p className='text-text-secondary text-sm leading-relaxed'>
                Sign in to manage your luxury fleet access.
              </p>
            </div>

            {/* Form */}
            <div className="flex flex-col gap-5">

              {/* Email */}
              <div className="flex flex-col gap-2">
                <label
                  htmlFor='email-address'
                  className='text-sm font-semibold text-text-primary'
                >
                  Email Address
                </label>

                <input
                  type="email"
                  id='email-address'
                  placeholder='name@company.com'
                  className='w-full border border-border bg-background rounded-xl py-4 px-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary transition-colors caret-primary-dark'
                />
              </div>

              {/* Password */}
              <div className="flex flex-col gap-2">

                {/* Label */}
                <div className="flex items-center justify-between">
                  <label
                    htmlFor='password'
                    className='text-sm font-semibold text-text-primary'
                  >
                    Password
                  </label>

                  <a
                    href="#"
                    className='text-xs font-medium text-primary hover:text-primary-dark transition-colors'
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Input */}
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    id='password'
                    placeholder='••••••••'
                    className='w-full bg-background border border-border rounded-xl px-4 py-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary transition-colors pr-12'
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className='absolute right-4 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors text-xl cursor-pointer'
                  >
                    {showPassword
                      ? <IoEyeOffOutline />
                      : <IoEyeOutline />}
                  </button>
                </div>
              </div>
            </div>

            {/* Sign In */}
            <button className="bg-gradient-accent w-full mt-8 py-4 rounded-xl text-white font-semibold text-base hover:opacity-90 transition-opacity cursor-pointer">
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3 my-7">
              <span className='flex-1 h-px bg-border'></span>

              <p className='text-xs font-medium text-text-secondary tracking-widest uppercase'>
                Or continue with
              </p>

              <span className='flex-1 h-px bg-border'></span>
            </div>

            {/* Social Buttons */}
            <div className="flex gap-3">

              <button className='flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3.5 text-sm font-medium text-text-primary hover:bg-background transition-colors cursor-pointer'>
                <FaGoogle className='text-base' />
                Google
              </button>

              <button className='flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3.5 text-sm font-medium text-text-primary hover:bg-background transition-colors cursor-pointer'>
                <FaApple className='text-base' />
                Apple
              </button>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-text-secondary mt-7">
              Don't have an account?{" "}

              <a
                href="#"
                className="font-semibold text-primary hover:text-primary-dark transition-colors"
              >
                Sign up for free
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}