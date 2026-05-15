import { useState } from 'react'
import { FaGoogle, FaApple } from 'react-icons/fa';
import { IoEyeOutline, IoEyeOffOutline } from 'react-icons/io5';
import carImageSrc from "../../assets/dashboardImages/carImage.png";
export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
 
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      {/* Card — stacked on mobile, row on desktop */}
      <div className="bg-surface w-full max-w-md md:max-w-3xl rounded-2xl overflow-hidden flex flex-col md:flex-row shadow-soft border border-gray-100">
 
        {/* LEFT PANEL — hidden on mobile   */}
        <div className="hidden md:flex flex-col w-1/2 relative min-h-full">
 
          {/* Car image */}
          <img
            src={carImageSrc}
            alt="Luxury car"
            className="absolute inset-0 w-full h-full object-cover"
          />
 
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-slate-900/75" />
 
          {/* Text content */}
          <div className="relative z-10 flex flex-col p-10 h-full">
            <p className="font-bold text-white text-2xl tracking-wider uppercase">
              LuxeDrive
            </p>
           <div className="flex flex-col justify-center grow gap-5">
    <h2 className="font-extrabold text-white text-5xl leading-tight drop-shadow-md">
      Redefining <br /> The Road.
    </h2>
    <p className="text-white/70 text-lg leading-relaxed max-w-sm">
      Access the world's most exclusive fleet with the touch of a button.
      Experience peerless performance.
    </p>
  </div>
</div>
 
        </div>
        {/* RIGHT PANEL — the form*/}
        <div className="w-full md:w-1/2 p-9 flex flex-col">
 
          {/* Card Header */}
          <div className="mb-8">
            <h1 className='text-3xl font-bold text-text-primary mb-2'>Welcome Back</h1>
            <p className='text-text-secondary pl-1 text-sm leading-relaxed'>
              Sign in to manage your luxury fleet access.
            </p>
          </div>
 
          {/* Form */}
          <div className="flex flex-col gap-6">
 
            {/* Email Field */}
            <div className="flex flex-col gap-2">
              <label htmlFor='email-address' className='text-sm font-semibold text-text-primary pl-2'>
                Email Address
              </label>
              <input
                type="email"
                id='email-address'
                placeholder='name@company.com'
                className='w-full border border-border bg-background rounded-xl py-4 px-3 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary transition-colors caret-primary-dark'
              />
            </div>
 
            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
 
              {/* Password label row */}
              <div className="flex items-center justify-between">
                <label htmlFor='password' className='text-sm font-semibold text-text-primary pl-2'>
                  Password
                </label>
                <a href="#" className='text-xs font-medium text-primary hover:text-primary-dark transition-colors'>
                  Forgot password?
                </a>
              </div>
 
              {/* Input + eye icon wrapper */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id='password'
                  placeholder='••••••••'
                  className='w-full bg-background border border-border rounded-xl px-3 py-4 text-sm text-text-primary placeholder:text-text-secondary outline-none focus:border-primary transition-colors pr-11'
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary hover:text-text-primary transition-colors text-xl cursor-pointer'
                >
                  {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
                </button>
              </div>
 
            </div>
          </div>
 
          {/* Sign In Button */}
          <button className="bg-gradient-accent w-full mt-8 py-3.5 rounded-xl text-white font-semibold text-base hover:opacity-90 transition-opacity cursor-pointer">
            Sign In
          </button>
 
          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <span className='flex-1 h-px bg-border'></span>
            <p className='text-xs font-medium text-text-secondary tracking-widest uppercase'>
              Or continue with
            </p>
            <span className='flex-1 h-px bg-border'></span>
          </div>
 
          {/* Social Buttons */}
          <div className="flex gap-3">
            <button className='flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium text-text-primary hover:bg-background transition-colors cursor-pointer'>
              <FaGoogle className='text-base' />
              Google
            </button>
            <button className='flex-1 flex items-center justify-center gap-2 border border-border rounded-xl py-3 text-sm font-medium text-text-primary hover:bg-background transition-colors cursor-pointer'>
              <FaApple className='text-base' />
              Apple
            </button>
          </div>
 
          {/* Footer */}
          <p className="text-center text-sm text-text-secondary mt-6">
            Don't have an account?{" "}
            <a href="#" className="font-semibold text-primary hover:text-primary-dark transition-colors">
              Sign up for free
            </a>
          </p>
 
        </div>
      </div>
    </div>
  )
}