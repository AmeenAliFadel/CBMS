import {
  FiShield,
  FiDollarSign,
  FiCalendar,
  FiUsers,
  FiArrowRight,
  FiCheckCircle,
} from "react-icons/fi";
import CardShell from "../../components/host/CardShell";
import IconBadge from "../../components/host/IconBadge";

const statBars = [24, 34, 42, 56, 64];

export default function WhyHostSection() {
  return (
    <section className="px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-6xl">
        <header className="mx-auto max-w-2xl text-center">
          <h2 className="text-[clamp(1.65rem,3vw,2.55rem)] font-semibold tracking-[-0.04em] text-text-primary">
            Why host on LuxeDrive?
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
            Maximize your vehicle&apos;s ROI with our enterprise-grade
            management tools and premium client network.
          </p>
        </header>

        <div className="mt-10 grid gap-4 md:gap-5 lg:grid-cols-3">
          <CardShell className="lg:col-span-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="grid h-full gap-5 md:grid-cols-[1.05fr_0.95fr] md:gap-0">
              <div className="flex flex-col justify-between pr-0 md:pr-5">
                <div>
                  <IconBadge>
                    <FiShield className="h-5 w-5" />
                  </IconBadge>

                  <h3 className="mt-5 text-[1.2rem] font-medium tracking-[-0.03em] text-text-primary sm:text-[1.35rem]">
                    Earn With Confidence
                  </h3>

                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
                    Turn your luxury vehicle into a reliable source of passive
                    income while we handle secure bookings, verified drivers,
                    and premium support for every trip.
                  </p>
                </div>

                <a
                  href="#"
                  className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-primary transition hover:gap-3"
                >
                  Learn about protection
                  <FiArrowRight className="h-4 w-4" />
                </a>
              </div>

              <div className="relative mt-6 min-h-52.5 overflow-hidden rounded-xl border border-border bg-[linear-gradient(180deg,rgba(236,239,255,0.9),rgba(226,229,240,0.9))] md:mt-0 md:min-h-[280px]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_58%_34%,rgba(255,255,255,0.75),transparent_28%),linear-gradient(135deg,rgba(255,255,255,0.2),transparent_40%)]" />
                <div className="absolute left-6 right-6 top-5 h-1 rounded-full bg-white/55" />
                <div className="absolute left-8 right-8 top-12 h-1 rounded-full bg-white/38" />
                <div className="absolute inset-y-0 right-5 w-12 bg-[linear-gradient(180deg,rgba(255,255,255,0.15),rgba(255,255,255,0))] opacity-70" />
                <div className="absolute bottom-5 right-5 h-16 w-16 rounded-full bg-[radial-gradient(circle,rgba(148,163,184,0.22),rgba(148,163,184,0.05)_68%,transparent_70%)]" />
              </div>
            </div>
          </CardShell>

          <CardShell className="bg-[#eef8ff] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex h-full flex-col">
              <IconBadge>
                <FiDollarSign className="h-5 w-5" />
              </IconBadge>

              <h3 className="mt-5 text-[1.2rem] font-medium tracking-[-0.03em] text-slate-900 sm:text-[1.35rem]">
                Passive Earnings
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 sm:text-[15px]">
                Join LuxeDrive and begin earning from your vehicle through
                secure, high-quality rental experiences.
              </p>

              <div className="mt-auto rounded-xl bg-white/60 p-4 shadow-[0_16px_30px_rgba(15,23,42,0.05)]">
                <div className="flex h-24 items-end gap-1.5">
                  {statBars.map((bar, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-sky-200/70"
                      style={{ height: `${bar}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </CardShell>

          <CardShell className="bg-[#f9f3ff] hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="flex h-full flex-col">
              <IconBadge>
                <FiCalendar className="h-5 w-5" />
              </IconBadge>

              <h3 className="mt-5 text-[1.2rem] font-medium tracking-[-0.03em] text-slate-900 sm:text-[1.35rem]">
                Total Control
              </h3>

              <p className="mt-3 max-w-sm text-sm leading-6 text-slate-600 sm:text-[15px]">
                Control your listings, bookings, and pricing from one intuitive
                host dashboard.
              </p>

              <button className="mt-8 inline-flex h-11 items-center justify-center rounded-full border border-pink-200 bg-white/80 px-5 text-sm font-semibold text-fuchsia-600 shadow-sm transition hover:bg-white">
                Host Dashboard v2.0
              </button>
            </div>
          </CardShell>

          <CardShell className="bg-[#eef2ff] lg:col-span-2 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
            <div className="grid h-full gap-6 md:grid-cols-[1fr_0.95fr] md:items-center md:gap-10">
              <div>
                <IconBadge>
                  <FiUsers className="h-5 w-5" />
                </IconBadge>

                <h3 className="mt-5 text-[1.2rem] font-medium tracking-[-0.03em] text-slate-900 sm:text-[1.35rem]">
                  Premium Client Network
                </h3>

                <p className="mt-3 max-w-xl text-sm leading-6 text-slate-600 sm:text-[15px]">
                  We vet every driver. Our community consists of verified
                  professionals and luxury enthusiasts who respect your
                  property.
                </p>
              </div>

              <div className="space-y-4">
                {[0, 1].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-4 rounded-xl border border-slate-200 bg-white/85 px-4 py-3 shadow-[0_12px_30px_rgba(15,23,42,0.05)]"
                  >
                    <div className="h-8 w-8 rounded-full bg-slate-200" />
                    <div className="min-w-0 flex-1">
                      <div className="h-2.5 w-24 rounded-full bg-slate-200/80" />
                      <div className="mt-2 h-2 w-14 rounded-full bg-slate-200/70" />
                    </div>
                    <FiCheckCircle className="h-5 w-5 text-cyan-500" />
                  </div>
                ))}
              </div>
            </div>
          </CardShell>
        </div>
      </div>
    </section>
  );
}
