import { HiCheckBadge } from "react-icons/hi2";
import Logo from "../../assets/Logo.svg";
import InfoCard from "../../components/host/InfoCardHostSuccessPage";
import { cards } from "../../data/host/HostFormPageData";
import JourneyStep from "../../components/host/JourneyStep";

export default function HostApplicationStatusPage() {
  return (
    <div className="min-h-screen px-4 py-8 text-text-primary sm:px-6 sm:py-10 lg:px-8 flex justify-center items-center">
      <div className="flex w-full max-w-6xl flex-col items-center">

        {/* ICON BOX */}
        <div
          className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24 my-12"
          data-aos="zoom-in"
        >
          <div className="absolute inset-0 bg-primary/30 blur-xl animate-ping" />

          <div className="flex flex-col items-center rounded-xl mt-8 border border-white/70 bg-white px-10 py-8 shadow-[0_20px_50px_rgba(99,102,241,0.12)] backdrop-blur-sm">
            
            <div className="relative flex h-20 w-20 items-center justify-center sm:h-24 sm:w-24">
              <div className="absolute inset-0 bg-primary/30 blur-xl animate-ping" />

              <div className="relative flex h-full w-full items-center justify-center rounded-full bg-primary shadow-[0_18px_40px_rgba(99,102,241,0.28)] animate-scaleIn">
                <HiCheckBadge className="h-10 w-10 text-white sm:h-12 sm:w-12 animate-float" />
              </div>
            </div>

            <img
              src={Logo}
              alt="Logo"
              className="mt-6 w-28 object-contain sm:w-32"
            />
          </div>
        </div>

        {/* TITLE */}
        <section
          className="mt-10 text-center sm:mt-14"
          data-aos="fade-up"
        >
          <h1 className="text-[clamp(1.8rem,4vw,3rem)] font-extrabold tracking-[-0.04em] text-primary">
            Your application is under review ...
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-text-primary sm:text-[15px]">
            Thanks for applying to become a host. We're currently detailing your request to ensure everything meets our premium standards.
          </p>
        </section>

        {/* CARDS */}
        <section
          className="mt-10 grid w-full gap-4 sm:mt-12 md:grid-cols-3 md:gap-5"
          data-aos="fade-up"
          data-aos-delay="100"
        >
          {cards.map((item) => (
            <InfoCard key={item.title} item={item} />
          ))}
        </section>

        {/* JOURNEY */}
        <section
          className="mt-10 w-full max-w-4xl rounded-2xl border border-border bg-white/75 p-5 shadow-[0_12px_40px_rgba(99,102,241,0.08)] backdrop-blur-sm sm:mt-12 sm:p-8"
          data-aos="zoom-in"
        >
          <div className="text-center text-[11px] font-bold tracking-[0.28em] text-primary sm:text-xs">
            APPLICATION JOURNEY
          </div>

          <div className="relative mt-8 flex items-start justify-between">
            <div className="absolute left-0 right-0 top-2.75 h-1 rounded-full bg-border sm:top-3.25" />
            <div className="absolute left-0 top-2.75 h-1 w-[58%] rounded-full bg-primary sm:top-3.25" />

            <JourneyStep label="Submitted" done />
            <JourneyStep label="Reviewing" active />
            <JourneyStep label="Active" />
          </div>
        </section>

        {/* BUTTONS */}
        <section
          className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:mt-12 sm:flex-row"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <button className="group relative w-full overflow-hidden rounded-full bg-linear-to-r from-fuchsia-600 to-primary px-8 py-4 text-sm font-semibold text-white shadow-[0_12px_24px_rgba(99,102,241,0.28)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_16px_34px_rgba(99,102,241,0.35)] sm:w-[235px]">
            <span className="relative z-10">Go to Dashboard</span>
            <span className="absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-700 group-hover:translate-x-full" />
          </button>

          <button className="w-full rounded-full border border-border bg-white px-8 py-4 text-sm font-semibold text-text-primary transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:text-primary hover:shadow-[0_10px_24px_rgba(99,102,241,0.12)] sm:w-[255px]">
            Explore Marketplace
          </button>
        </section>

      </div>
    </div>
  );
}