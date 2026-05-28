import { FiArrowLeft, FiCheckCircle, FiExternalLink } from "react-icons/fi";
import { Link } from "react-router-dom";
import BottomItem from "../../components/host/BottomItem";
import { FiShield, FiLock, FiHeadphones } from "react-icons/fi";

const approvedSteps = [
    { id: 1, label: "Request Sent" },
    { id: 2, label: "Under Review" },
    { id: 3, label: "Approved" },
];

export default function HostApprovedPage() {
    return (
        <div className="mt-8 flex min-h-screen w-full flex-col items-center bg-background px-4 py-6 font-sans text-text-primary">
            <div
                data-aos="fade-up"
                className="relative mb-8 flex w-full max-w-230 items-start justify-between"
            >
                <div className="absolute left-[64px] right-[64px] top-[14px] h-[2px] bg-primary/20" />
                <div className="absolute left-[64px] right-[64px] top-[14px] h-[2px] bg-primary" />

                {approvedSteps.map((step) => (
                    <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-primary bg-primary text-[12px] font-semibold text-white shadow-[0_4px_10px_rgba(91,92,233,0.28)] sm:h-10 sm:w-10">
                            <FiCheckCircle className="text-[14px] sm:text-[16px]" />
                        </div>

                        <span className="text-[10px] font-medium text-primary sm:text-[12px]">
                            {step.label}
                        </span>
                    </div>
                ))}
            </div>

            <div
                data-aos="fade-up"
                className="w-full max-w-230 rounded-2xl border border-border bg-white px-4 py-8 shadow-[0_10px_30px_rgba(34,35,58,0.05)] md:py-12 lg:px-12 lg:py-16 md:lg:px-8"
            >
                <div className="mx-auto flex max-w-190 flex-col items-center text-center">
                    <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FiCheckCircle className="text-[38px]" />
                    </div>

                    <div className="mb-10">
                        <h1 className="text-2xl font-bold tracking-[-0.03em] text-primary sm:text-[32px] lg:text-[42px] lg:leading-12">
                            Your request has been approved
                        </h1>

                        <p className="mt-4 max-w-2xl text-[14px] leading-7 text-gray-400 lg:text-[16px]">
                            Your host request was accepted successfully. You can now go to the dashboard and sign in with your account to continue as a lessor.
                        </p>
                    </div>

                    <div className="w-full rounded-2xl border border-border bg-bg/60 p-5 sm:p-6">
                        <p className="text-[13px] font-semibold uppercase tracking-[0.14em] text-primary/80">
                            Next step
                        </p>

                        <p className="mt-3 text-[14px] leading-7 text-text-primary sm:text-[15px]">
                            A dashboard account is now available for your approved request. Open the dashboard in a new tab and sign in to continue.
                        </p>
                    </div>

                    <div className="mt-10 flex w-full flex-col items-center justify-center gap-4 sm:flex-row">
                        <a
                            href="http://127.0.0.1:8000/"
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex h-13.5 min-w-62.5 items-center justify-center gap-2 rounded-xl bg-primary px-6 text-[15px] font-semibold text-white shadow-[0_12px_24px_rgba(91,92,233,0.28)] transition-all duration-200 hover:bg-[#4f50df] active:scale-[0.98]"
                        >
                            <FiExternalLink className="text-[18px]" />
                            Go to Dashboard
                        </a>

                        <Link
                            to="/"
                            className="group inline-flex h-13.5 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 text-[15px] font-medium text-text-primary backdrop-blur-sm transition-all duration-300"
                        >
                            <FiArrowLeft className="text-lg transition-transform duration-300 group-hover:-translate-x-1" />
                            <span>Back to website</span>
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-7 flex w-full max-w-230 flex-wrap items-center justify-center gap-10 text-[12px] font-medium uppercase tracking-[0.04em] text-text-primary">
                <BottomItem icon={<FiShield size={15} />} text="Secure Verification" />
                <BottomItem icon={<FiLock size={15} />} text="Privacy Guaranteed" />
                <BottomItem icon={<FiHeadphones size={15} />} text="24/7 Host Support" />
            </div>
        </div>
    );
}