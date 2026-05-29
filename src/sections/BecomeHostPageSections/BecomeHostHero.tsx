import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import heroImage from "../../assets/HostPageImages/hostimage.webp";

export default function HostHeroSection() {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setOffset(window.scrollY * 0.25); 
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className="relative bg-[#f5f7fb] overflow-hidden">

      {/* BACKGROUND IMAGE */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury car background"
          className="h-[120%] w-full object-cover object-center"
          style={{
            transform: `translateY(${offset}px)`,
            transition: "transform 0.1s linear",
          }}
        />

        {/* overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_18%,rgba(255,255,255,0.78)_34%,rgba(255,255,255,0.45)_52%,rgba(255,255,255,0.12)_70%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(255,255,255,0.65),transparent_34%),radial-gradient(circle_at_74%_54%,rgba(255,255,255,0.05),transparent_22%)]" />
      </div>

      {/* CONTENT */}
      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">

        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)]">

          {/* LEFT */}
          <div data-aos="fade-up" className="relative z-10 max-w-xl">

            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-3 py-1.5 backdrop-blur-md shadow-sm">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-[11px] font-medium tracking-wide text-slate-700">
                Host Excellence Program
              </span>
            </div>

            <h1 className="max-w-[11ch] text-4xl sm:text-[48px] md:text-[72px] leading-[0.95] font-semibold tracking-tighter text-primary">
              Turn your car into a{" "}
              <span className="text-primary">high-earning</span> asset.
            </h1>

            <p className="mt-6 max-w-136 text-[18px] leading-7 text-slate-600/95">
              Join the world&apos;s most exclusive P2P car sharing marketplace.
              Start earning passive income with full insurance coverage.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">

              <Link
                to={"apply"}
                className="inline-flex h-14 items-center justify-center rounded-xl bg-linear-to-r from-[#7c3aed] to-[#4f46e5] px-8 text-[15px] font-medium text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
              >
                Start Hosting
              </Link>

              <div className="flex items-center gap-3 rounded-full bg-white/40 px-3 py-2 backdrop-blur-md">
                <div className="flex -space-x-3">
                  <div className="h-8 w-8 rounded-full bg-slate-900 text-white grid place-items-center text-[10px]">
                    A
                  </div>
                  <div className="h-8 w-8 rounded-full bg-slate-300 text-slate-700 grid place-items-center text-[10px]">
                    S
                  </div>
                  <div className="h-8 w-8 rounded-full bg-indigo-200 text-indigo-700 grid place-items-center text-[10px]">
                    +2k
                  </div>
                </div>

                <p className="text-sm text-slate-600">
                  Trusted by 2,000+ hosts
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT SPACER */}
          <div className="hidden lg:block min-h-112" />
        </div>
      </div>
    </section>
  );
}