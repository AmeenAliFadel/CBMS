import { useNavigate } from "react-router-dom";
import type { MembershipPlanId } from "../../data/membershipData";
import MembershipHero from "../../components/membership/MembershipHero";
import MembershipPlansGrid from "../../components/membership/MembershipPlansGrid";
import MembershipComparisonTable from "../../components/membership/MembershipComparisonTable";

export default function MembershipPlansPage() {
    const navigate = useNavigate();

    const handleSelectPlan = (planId: MembershipPlanId) => {
        if (planId === "standard") return;
        navigate(`/membership/upgrade?plan=${planId}`);
    };

    return (
        <div className="min-h-screen bg-background px-4 py-6 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl rounded-4xl border border-primary/10 bg-surface shadow-[0_24px_70px_rgba(108,78,255,0.08)]">
                <div className="px-5 py-5 sm:px-6 lg:px-8">
                    <MembershipHero />

                    <div className="mt-8">
                        <MembershipPlansGrid onSelectPlan={handleSelectPlan} />
                    </div>

                    <MembershipComparisonTable />
                </div>
            </div>
        </div>
    );
}