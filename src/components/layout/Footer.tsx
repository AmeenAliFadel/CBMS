import { useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

const footerSections = [
  {
    title: "Platform",
    links: [
      { label: "Browse Cars", path: "/cars" },
      { label: "Favorites", path: "/favorites" },
      { label: "Notes", path: "/notes" },
      { label: "Become a Host", path: "/become-host" },
    ],
  },

  {
    title: "Account",
    links: [
      { label: "My Profile", path: "/profile" },
      { label: "My Bookings", path: "/profile" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
      { label: "Contact Us", path: "/contact" },
    ],
  },
];

const socialLinks = [
  {
    label: "Instagram",
    href: "https://instagram.com",
  },

  {
    label: "Twitter",
    href: "https://twitter.com",
  },

  {
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
];

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubscribe = () => {
    if (!email.trim()) return;

    console.log("Subscribed:", email);

    setEmail("");
  };

  return (
    <footer className="bg-text-primary text-white mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-10 lg:px-16 py-16">

        {/* TOP */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* BRAND */}
          <div>
            <Link to="/" className="inline-block">
              <h2 className="text-2xl font-bold tracking-wide">
                LuxeDrive
              </h2>
            </Link>

            <p className="mt-5 text-sm leading-7 text-slate-400 max-w-sm">
              Premium luxury car rental platform built for unforgettable
              driving experiences and elite automotive performance.
            </p>
          </div>

          {/* DYNAMIC SECTIONS */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h4 className="text-sm font-semibold uppercase tracking-[3px] text-slate-300 mb-6">
                {section.title}
              </h4>

              <ul className="space-y-4">
                {section.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-slate-400 hover:text-white transition duration-300 text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* NEWSLETTER */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-[3px] text-slate-300 mb-6">
              Newsletter
            </h4>

            <p className="text-sm text-slate-400 leading-6 mb-5">
              Get early access to exclusive vehicles, premium offers,
              and luxury driving experiences.
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
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-slate-500 hover:text-white transition"
              >
                {social.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}