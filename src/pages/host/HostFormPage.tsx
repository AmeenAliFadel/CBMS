import { FiUpload, FiShield, FiLock, FiHeadphones, FiArrowLeft } from "react-icons/fi";
import { steps } from "../../types/host/hostPagesTypes";
import Field from "../../components/host/Filed";
import UploadCard from "../../components/host/UploadCard";
import BottomItem from "../../components/host/BottomItem";
import { Link } from "react-router-dom";

export default function HostFormPage() {
  return (
    <div className="min-h-screen w-full bg-background flex flex-col items-center px-4 py-6 font-sans text-text-primary mt-8">
      {/* Stepper */}
      <div className="w-full max-w-230 flex items-start justify-between relative mb-8">
        <div className="absolute top-[14px] left-[64px] right-[64px] h-[2px] bg-[#d9d8ef]" />
        <div className="absolute top-[14px] left-[64px] w-[18%] h-[2px] bg-primary" />

        {steps.map((step) => (
          <div
            key={step.id}
            className="relative z-10 flex flex-col items-center gap-2"
          >
            <div
              className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-[12px] font-semibold border transition-all ${
                step.active
                  ? "bg-primary text-white border-primary shadow-[0_4px_10px_rgba(91,92,233,0.28)]"
                  : "bg-white text-[#7c8193] border-border"
              }`}
            >
              {step.id}
            </div>

            <span
              className={`text-[10px] sm:text-[12px] font-medium ${
                step.active ? "text-primary" : "text-gray-400"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {/* Card */}
      <div className="w-full max-w-230 bg-white rounded-2xl border border-border shadow-[0_10px_30px_rgba(34,35,58,0.05)] px-4 py-8 md:lg:px-8 md:py-12 lg:px-12 lg:py-16">
        <div className="max-w-190 mx-auto">
          {/* Heading */}
          <div className="mb-10">
            <h1 className="text-2xl sm:text-[32px] lg:text-[42px] leading-12 font-bold tracking-[-0.03em] text-primary">
              Become a Host
            </h1>

            <p className="mt-3 text-[14px] lg:text-[16px] leading-7 text-gray-400 max-w-155">
              Tell us a bit about yourself. This information helps us review
              your request to become a host on the platform and ensure a trusted
              experience for all users.
            </p>
          </div>

          {/* Form */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-5">
            <Field label="Bussiness Name" placeholder="John cars" />
            <Field label="Phone Number" placeholder="+1 (555) 000-0000" />
            <Field label="City" placeholder="Los Angeles, CA" />
            <Field label="Message" placeholder="text.." />
          </div>

          <div className="w-full h-px bg-bg my-10" />

          {/* Verification */}
          <div>
            <h2 className="text-2xl md:text-[30px] font-semibold tracking-[-0.02em] text-text-primary mb-6 text-center">
              Identity Verification
            </h2>

            <div className="flex items-center justify-center w-full">
              <UploadCard
                title="Upload a photo of your personal ID"
                subtitle="Front of card, JPG or PNG"
                icon={<FiUpload size={28} />}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 mt-14">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-[15px] font-medium text-text-primary backdrop-blur-sm transition-all duration-300 "
            >
              <FiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />

              <span className="transition-colors duration-300">
                Back to website
              </span>
            </Link>

            <button className="h-13.5 min-w-62.5 rounded-xl bg-primary hover:bg-[#4f50df] text-white text-[15px] font-semibold shadow-[0_12px_24px_rgba(91,92,233,0.28)] transition-all duration-200 active:scale-[0.98]">
              Submit
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Features */}
      <div className="w-full max-w-230 flex flex-wrap items-center justify-center gap-10 mt-7 text-text-primary text-[12px] tracking-[0.04em] font-medium uppercase">
        <BottomItem icon={<FiShield size={15} />} text="Secure Verification" />

        <BottomItem icon={<FiLock size={15} />} text="Privacy Guaranteed" />

        <BottomItem
          icon={<FiHeadphones size={15} />}
          text="24/7 Host Support"
        />
      </div>
    </div>
  );
}
