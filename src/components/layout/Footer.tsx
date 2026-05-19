import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log(email);
    setEmail("");
  };

  return (
    <footer className="bg-text-primary text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div className="lg:col-span-1">
            <h2 className="text-2xl font-bold tracking-wide">
              LuxeDrive
            </h2>

            <p className="mt-5 text-sm leading-7 text-slate-400 max-w-sm">
              The world’s premier peer-to-peer luxury automotive marketplace
              built for elite experiences and timeless performance.
            </p>
          </div>

          {/* PLATFORM */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-slate-300 mb-6">
              Platform
            </h4>

            <ul className="space-y-4">
              {[
                "Fleet Management",
                "Insurance & Safety",
                "Help Center",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* LEGAL */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-slate-300 mb-6">
              Legal
            </h4>

            <ul className="space-y-4">
              {[
                "Terms of Service",
                "Privacy Policy",
                "Contact Us",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-slate-400 hover:text-white transition duration-300 text-sm"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-slate-300 mb-6">
              Newsletter
            </h4>

            <p className="text-sm text-slate-400 leading-6 mb-5">
              Get early access to exclusive listings and premium offers.
            </p>

            <div className="relative w-full">

              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="
      w-full
      h-16
      rounded-2xl
      border
      border-slate-700
      bg-slate-800
      pl-6
      pr-20
      text-sm
      text-white
      placeholder:text-slate-500
      outline-none
      focus:border-indigo-500
      transition
    "
              />

              <button
                onClick={handleSubscribe}
                className="
      absolute
      right-2
      top-1/2
      -translate-y-1/2
      h-12
      w-12
      rounded-xl
      bg-indigo-600
      hover:bg-indigo-500
      flex
      items-center
      justify-center
      transition
      duration-300
    "
              >
                <FiArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* DIVIDER */}
        <div className="border-t border-slate-800 my-10" />

        {/* BOTTOM */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">

          <p className="text-sm text-slate-500">
            © 2026 LuxeDrive. All rights reserved.
          </p>

          <div className="flex items-center gap-6">
            {["Instagram", "Twitter", "LinkedIn"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-sm text-slate-500 hover:text-white transition"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}