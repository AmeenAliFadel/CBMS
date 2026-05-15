import React from "react";
import { Link } from "react-router-dom";

const CtaSection: React.FC = () => {
  return (
    <section className="w-full bg-[#283044] py-16 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl text-center">
        {/* Top Text */}
        <p className="text-sm sm:text-base text-gray-300">
          Ready to maximize your car&apos;s potential?
        </p>

        {/* Heading */}
        <h2 className="mt-6 text-lg sm:text-xl md:text-2xl leading-relaxed text-gray-100 font-light">
          It takes less than 10 minutes to list your vehicle.
          <br className="hidden sm:block" />
          Start your journey with LuxeDrive today.
        </h2>

        {/* Buttons */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to={'apply'} className="w-full sm:w-auto min-w-[180px] rounded-xl bg-gradient-to-r from-fuchsia-600 to-primary px-8 py-4 text-white text-base font-medium transition hover:opacity-90">
            Start Hosting
          </Link>

          <Link to={'/contact'} className="w-full sm:w-auto min-w-[180px] rounded-xl border border-border bg-transparent px-8 py-4 text-white text-base font-medium transition hover:bg-white/5">
            Talk to an Expert
          </Link>
        </div>

        {/* Bottom Text */}
        <p className="mt-8 text-sm text-gray-400">
          No commitment required. Cancel any time.
        </p>
      </div>
    </section>
  );
};

export default CtaSection;