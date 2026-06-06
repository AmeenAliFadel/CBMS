import { FaCheckCircle, FaArrowRight, FaUpload } from "react-icons/fa";

export default function MembershipUpgradeForm() {
    return (
        <section className="rounded-[28px] border border-border/40 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-start justify-between gap-3">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-text-secondary">
                        Step 2 of 2
                    </p>
                    <h1 className="mt-2 text-3xl font-black tracking-tight text-text-primary">
                        Payment Proof Upload
                    </h1>
                    <p className="mt-2 max-w-2xl text-sm leading-6 text-text-secondary">
                        Upload your payment proof to activate the membership request.
                    </p>
                </div>

                <span className="rounded-full bg-primary/10 px-3 py-1 text-[11px] font-bold text-primary">
                    Pending Review
                </span>
            </div>

            <div className="mt-6 rounded-[28px] border border-dashed border-primary/20 bg-primary/5 p-5 sm:p-6">
                <div className="mx-auto flex max-w-md flex-col items-center text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white text-2xl text-primary shadow-sm">
                        <FaUpload />
                    </div>

                    <h3 className="mt-4 text-lg font-bold text-text-primary">
                        Click or drag file to this area
                    </h3>
                    <p className="mt-2 text-sm text-text-secondary">
                        Supported: PDF, JPG, PNG (Max 10MB)
                    </p>

                    <label className="relative mt-5 inline-flex cursor-pointer items-center justify-center rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white transition hover:bg-primary-dark">
                        Choose File
                        <input
                            type="file"
                            accept=".pdf,image/*"
                            className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                        />
                    </label>
                </div>
            </div>

            <div className="mt-5">
                <label className="mb-2 block text-sm font-semibold text-text-primary">
                    Additional Notes (Optional)
                </label>
                <textarea
                    rows={4}
                    placeholder="Enter any transaction reference numbers or notes here..."
                    className="w-full resize-none rounded-[22px] border border-border/60 bg-surface px-4 py-3 text-sm text-text-primary outline-none transition placeholder:text-text-secondary/70 focus:border-primary"
                />
            </div>

            <div className="mt-5 rounded-[22px] border border-border/50 bg-background px-4 py-4">
                <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <FaCheckCircle className="text-[10px]" />
                    </span>
                    <p className="text-sm leading-6 text-text-secondary">
                        Our team will manually review your submission. Approval typically
                        takes 2–4 business hours.
                    </p>
                </div>
            </div>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:items-center sm:justify-between">
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-full border border-border/60 bg-white px-5 py-3 text-sm font-semibold text-text-primary transition hover:bg-background"
                >
                    Change Plan
                </button>

                <button
                    type="button"
                    className="inline-flex cursor-default items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-white opacity-70"
                >
                    Submit Request
                    <FaArrowRight className="text-xs" />
                </button>
            </div>
        </section>
    );
}