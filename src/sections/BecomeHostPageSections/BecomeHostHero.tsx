import { Link } from "react-router-dom";
import heroImage from "../../assets/HostPageImages/hostimage.jpg";
export default function HostHeroSection() {
  return (
    <section className="relative  bg-[#f5f7fb]">
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Luxury car background"
          className="h-full w-full object-cover object-center"
        />

        {/* Soft white wash to match the reference design */}
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.97)_0%,rgba(255,255,255,0.93)_18%,rgba(255,255,255,0.78)_34%,rgba(255,255,255,0.45)_52%,rgba(255,255,255,0.12)_70%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_32%,rgba(255,255,255,0.65),transparent_34%),radial-gradient(circle_at_74%_54%,rgba(255,255,255,0.05),transparent_22%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.24)_0%,rgba(255,255,255,0.08)_38%,rgba(255,255,255,0.03)_100%)]" />
      </div>

      <div className="relative mx-auto flex min-h-screen w-full max-w-7xl items-center px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid w-full items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:gap-8">
          {/* Left content */}
          <div className="relative z-10 max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/70 bg-white/50 px-3 py-1.5 shadow-[0_8px_30px_rgba(90,100,120,0.12)] backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-primary" />
              <span className="text-[11px] font-medium tracking-wide text-slate-700">
                Host Excellence Program
              </span>
            </div>

            <h1 className="max-w-[11ch] text-4xl sm:text-[48px] md:text-[72px] leading-[0.95] font-semibold tracking-tighter text-primary sm:max-w-[12ch]">
              Turn your car into a<span className="text-primary"> high-</span>
              <span className="text-primary">earning</span> asset.
            </h1>

            <p className="mt-6 max-w-[34rem]  md:text-[18px] leading-7 text-slate-600/95">
              Join the world&apos;s most exclusive P2P car sharing marketplace.
              List your luxury vehicle and start earning passive income with
              full insurance coverage.
            </p>

            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
              <Link to={'apply'} className="inline-flex h-14 items-center justify-center rounded-xl bg-gradient-to-r from-[#7c3aed] via-[#7c3aed] to-[#4f46e5] px-8 text-[15px] font-medium text-white shadow-[0_18px_40px_rgba(124,58,237,0.32)] transition-transform duration-200 hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(124,58,237,0.38)] focus:outline-none focus:ring-2 focus:ring-[#7c3aed]/40 focus:ring-offset-2 focus:ring-offset-transparent">
                Start Hosting
              </Link>

              <div className="flex items-center gap-3 rounded-full bg-white/35 px-3 py-2 backdrop-blur-md">
                <div className="flex -space-x-3">
                  <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-slate-900 text-[10px] font-semibold text-white shadow-sm">
                    A
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-slate-300 text-[10px] font-semibold text-slate-700 shadow-sm">
                    S
                  </div>
                  <div className="grid h-8 w-8 place-items-center rounded-full border-2 border-white bg-indigo-200 text-[10px] font-semibold text-indigo-700 shadow-sm">
                    +2k
                  </div>
                </div>
                <p className="whitespace-nowrap text-sm text-slate-600">
                  Trusted by 2,000+ hosts
                </p>
              </div>
            </div>
          </div>

          {/* Right visual spacing keeps the car aligned like the reference */}
          <div
            className="relative hidden min-h-[28rem] lg:block"
            aria-hidden="true"
          >
            <div className="absolute inset-y-0 left-0 right-0 rounded-[2rem] bg-[radial-gradient(circle_at_55%_35%,rgba(255,255,255,0.18),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),rgba(255,255,255,0))]" />
          </div>
        </div>
      </div>
    </section>
  );
}
