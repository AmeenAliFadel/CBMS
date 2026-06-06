import { FaArrowRight, FaCheck } from "react-icons/fa";
import type { MembershipPlan, MembershipPlanId } from "../../data/membershipData";

interface MembershipPlanCardProps {
    plan: MembershipPlan;
    onSelect: (planId: MembershipPlanId) => void;
}

export default function MembershipPlanCard({
    plan,
    onSelect,
}: MembershipPlanCardProps) {
    const Icon = plan.icon;

    return (
        <article
            className={`relative flex h-full flex-col rounded-[28px] border bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.05)] transition duration-300 sm:p-6 ${plan.highlight
                    ? "border-primary/35 ring-1 ring-primary/15"
                    : "border-border/60"
                }`}
        >
            {plan.badge ? (
                <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2">
                    <span
                        className={`rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.14em] ${plan.highlight
                                ? "bg-primary text-white"
                                : "bg-accent/10 text-accent-dark"
                            }`}
                    >
                        {plan.badge}
                    </span>
                </div>
            ) : null}

            <div className="flex items-start justify-between">
                <div
                    className={`flex h-12 w-12 items-center justify-center rounded-2xl ${plan.highlight
                            ? "bg-primary/10 text-primary"
                            : "bg-background text-text-secondary"
                        }`}
                >
                    <Icon className="text-lg" />
                </div>
            </div>

            <div className="mt-5">
                <h2 className="text-2xl font-extrabold tracking-tight text-text-primary">
                    {plan.name}
                </h2>
                <p className="mt-1 text-xs text-text-secondary">Current Plan</p>

                <div className="mt-5 flex items-end gap-2">
                    <span className="text-4xl font-black tracking-tight text-text-primary">
                        {plan.price}
                    </span>
                    {plan.period ? (
                        <span className="pb-1 text-sm font-medium text-text-secondary">
                            {plan.period}
                        </span>
                    ) : null}
                </div>

                <p className="mt-4 text-sm leading-6 text-text-secondary">
                    {plan.description}
                </p>
            </div>

            <ul className="mt-6 space-y-3">
                {plan.benefits.map((benefit) => (
                    <li key={benefit} className="flex items-start gap-3 text-sm">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                            <FaCheck className="text-[10px]" />
                        </span>
                        <span className="text-text-secondary">{benefit}</span>
                    </li>
                ))}
            </ul>

            <div className="mt-6">
                <button
                    type="button"
                    disabled={plan.current}
                    onClick={() => onSelect(plan.id)}
                    className={`inline-flex w-full items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold transition duration-300 ${plan.current
                            ? "cursor-default bg-background text-text-secondary"
                            : plan.highlight
                                ? "bg-primary text-white hover:bg-primary-dark"
                                : "bg-background text-text-primary hover:bg-primary hover:text-white"
                        }`}
                >
                    {plan.ctaLabel}
                    {!plan.current ? <FaArrowRight className="text-xs" /> : null}
                </button>
            </div>
        </article>
    );
}