import { useState } from "react";
import { FiArrowRight } from "react-icons/fi";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="bg-white font-sans">
      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Main footer content */}
      <div className="px-4 py-10 md:px-8 md:py-12 lg:px-12 xl:px-20 max-w-300 mx-auto">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <a href="#" className="text-indigo-600 font-bold text-xl no-underline">
              LuxeDrive
            </a>
            <p className="mt-3 text-sm text-gray-500 leading-relaxed max-w-xs">
              The world's most exclusive peer-to-peer luxury automotive marketplace.
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
              Platform
            </h4>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {["Fleet Management", "Insurance & Safety", "Help Center"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
              Legal
            </h4>
            <ul className="flex flex-col gap-3 list-none m-0 p-0">
              {["Terms of Service", "Privacy Policy", "Contact Us"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-500 hover:text-gray-900 transition-colors no-underline"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-xs font-semibold tracking-widest text-gray-900 uppercase mb-4">
              Newsletter
            </h4>
            <p className="text-sm text-gray-500 mb-4">
              Join the elite circle for early access.
            </p>
            <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden focus-within:border-indigo-500 transition-colors">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="flex-1 px-3 py-2.5 text-sm text-gray-900 placeholder-gray-400 outline-none border-none bg-transparent"
              />
              <button
                type="button"
                onClick={handleSubscribe}
                className="w-10 h-10 flex items-center justify-center bg-indigo-600 hover:bg-indigo-700 text-white transition-colors shrink-0 cursor-pointer border-none"
              >
                <FiArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-100">
        <div className="px-4 py-4 md:px-8 lg:px-12 xl:px-20 max-w-300 mx-auto text-center">
          <p className="text-xs text-gray-400">
            © 2024 LuxeDrive P2P Marketplace. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}