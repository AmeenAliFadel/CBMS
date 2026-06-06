import { FaCheck } from "react-icons/fa";
import type { MembershipPlan } from "../../data/membershipData";

interface MembershipSelectedPlanCardProps {
    selectedPlan: MembershipPlan;
}

export default function MembershipSelectedPlanCard({
    selectedPlan,
}: MembershipSelectedPlanCardProps) {
    const Icon = selectedPlan.icon;

    return (
        <div className="rounded-[28px] border border-border/40 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-6">
            <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <Icon />
                </div>

                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                        Selected Plan
                    </p>
                    <h3 className="text-xl font-black text-text-primary">
                        {selectedPlan.name}
                    </h3>
                </div>
            </div>

            <div className="mt-5 rounded-3xl bg-background p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-text-secondary">
                    Price
                </p>

                <div className="mt-2 flex items-end gap-2">
                    <span className="text-4xl font-black text-text-primary">
                        {selectedPlan.price}
                    </span>
                    {selectedPlan.period ? (
                        <span className="pb-1 text-sm font-medium text-text-secondary">
                            {selectedPlan.period}
                        </span>
                    ) : null}
                </div>

                <p className="mt-3 text-sm leading-6 text-text-secondary">
                    {selectedPlan.description}
                </p>
            </div>

            <div className="mt-5">
                <h4 className="text-sm font-bold text-text-primary">
                    Included benefits
                </h4>

                <ul className="mt-3 space-y-3">
                    {selectedPlan.benefits.map((benefit) => (
                        <li key={benefit} className="flex items-start gap-3 text-sm">
                            <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <FaCheck className="text-[10px]" />
                            </span>
                            <span className="text-text-secondary">{benefit}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}