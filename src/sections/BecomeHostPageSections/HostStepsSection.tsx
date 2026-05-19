import { steps } from "../../data/host/HostPageData";

export default function HostStepsSection() {
  return (
    <section className="bg-white px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
      {/* Section Header */}
      <div className="mx-auto mb-14 max-w-3xl text-center">

        <h2 className="mt-5 text-[clamp(1.65rem,3vw,2.55rem)] font-semibold tracking-[-0.05em] text-text-primary">
          Start Earning From Your Car in 3 Simple Steps
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-[15px] leading-7 text-slate-600 sm:text-base">
          Join LuxeDrive, list your vehicle, and manage everything through a
          premium hosting experience designed for luxury car owners.
        </p>
      </div>
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6 xl:gap-10">
          {steps.map((step) => (
            <div key={step.number} className="flex h-full flex-col hover: transition-all duration-300 hover:-translate-y-1">
              <div className="relative">
                <span className="pointer-events-none mb-10 absolute -top-5 left-0 text-[clamp(4.2rem,8vw,6.8rem)] font-semibold leading-none tracking-[-0.08em] text-indigo-100/95 select-none">
                  {step.number}
                </span>
                <div className="pt-12 sm:pt-14 md:mt-12">
                  <h3 className="text-[1.35rem] font-semibold tracking-[-0.04em] text-text-primary sm:text-[1.5rem]">
                    {step.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-6 text-slate-600 sm:text-[15px]">
                    {step.description}
                  </p>
                </div>
              </div>

              <div
                className={`mt-6 overflow-hidden rounded-[1.25rem] shadow-[0_18px_45px_rgba(15,23,42,0.08)] ring-1 ring-black/5 ${step.cardClass}`}
              >
                <div className="relative aspect-[4/3] w-full sm:aspect-[16/11] md:aspect-[4/3] lg:aspect-[16/10]">
                  <img
                    src={step?.image}
                    alt={step.imageAlt}
                    className={`h-full w-full ${step.imageClass}`}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
