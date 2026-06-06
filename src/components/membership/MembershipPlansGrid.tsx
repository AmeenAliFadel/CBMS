import type { MembershipPlanId } from "../../data/membershipData";
import { membershipPlans } from "../../data/membershipData";
import MembershipPlanCard from "./MembershipPlanCard";

interface MembershipPlansGridProps {
    onSelectPlan: (planId: MembershipPlanId) => void;
}

export default function MembershipPlansGrid({
    onSelectPlan,
}: MembershipPlansGridProps) {
    return (
        <div className="grid gap-4 md:grid-cols-3">
            {membershipPlans.map((plan) => (
                <MembershipPlanCard
                    key={plan.id}
                    plan={plan}
                    onSelect={onSelectPlan}
                />
            ))}
        </div>
    );
}