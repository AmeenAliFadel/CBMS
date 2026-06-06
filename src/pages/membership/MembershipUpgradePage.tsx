import { useSearchParams } from "react-router-dom";
import { membershipPlans, getMembershipPlanById } from "../../data/membershipData";
import MembershipSelectedPlanCard from "../../components/membership/MembershipSelectedPlanCard";
import MembershipUpgradeForm from "../../components/membership/MembershipUpgradeForm";

export default function MembershipUpgradePage() {
    const [searchParams] = useSearchParams();
    const selectedPlan = getMembershipPlanById(searchParams.get("plan"));

    return (
        <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <div className="rounded-4xl border border-primary/10 bg-surface shadow-[0_24px_70px_rgba(108,78,255,0.08)]">
                    <div className="grid gap-6 p-4 sm:p-6 lg:grid-cols-[1fr_420px] lg:p-8">
                        <MembershipUpgradeForm />

                        <aside className="space-y-5">
                            <MembershipSelectedPlanCard selectedPlan={selectedPlan} />

                            <div className="rounded-[28px] border border-border/40 bg-white p-5 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-6">
                                <h4 className="font-semibold text-text-primary">
                                    Plan snapshot
                                </h4>

                                <div className="mt-4 space-y-3">
                                    {membershipPlans.map((plan) => {
                                        const isSelected = plan.id === selectedPlan.id;

                                        return (
                                            <div
                                                key={plan.id}
                                                className={`flex items-center justify-between rounded-[22px] border px-4 py-3 ${isSelected
                                                        ? "border-primary/30 bg-primary/5"
                                                        : "border-border/50 bg-background/60"
                                                    }`}
                                            >
                                                <div>
                                                    <p className="text-sm font-semibold text-text-primary">
                                                        {plan.name}
                                                    </p>
                                                    <p className="text-xs text-text-secondary">
                                                        {plan.price}
                                                        {plan.period}
                                                    </p>
                                                </div>

                                                <span
                                                    className={`rounded-full px-3 py-1 text-xs font-semibold ${isSelected
                                                            ? "bg-primary text-white"
                                                            : "bg-white text-text-secondary"
                                                        }`}
                                                >
                                                    {isSelected ? "Active" : "Available"}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </aside>
                    </div>
                </div>
            </div>
        </div>
    );
}