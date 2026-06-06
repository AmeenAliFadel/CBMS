import { comparisonFeatures } from "../../data/membershipData";

export default function MembershipComparisonTable() {
    return (
        <div className="mt-10">
            <h2 className="text-center text-xl font-bold text-text-primary">
                Compare Plans
            </h2>

            <div className="mx-auto mt-6 max-w-4xl overflow-hidden rounded-3xl border border-border/60 bg-white shadow-[0_14px_40px_rgba(15,23,42,0.04)]">
                <div className="grid grid-cols-4 bg-background/80 px-4 py-3 text-sm font-semibold text-text-secondary">
                    <div>Features</div>
                    <div className="text-center">Standard</div>
                    <div className="text-center text-primary">Pro</div>
                    <div className="text-center">Elite</div>
                </div>

                {comparisonFeatures.map((feature, index) => (
                    <div
                        key={feature.label}
                        className={`grid grid-cols-1 gap-2 px-4 py-4 text-sm md:grid-cols-4 md:items-center ${index !== comparisonFeatures.length - 1
                                ? "border-b border-border/50"
                                : ""
                            }`}
                    >
                        <div className="font-medium text-text-primary">{feature.label}</div>

                        <div className="text-text-secondary md:text-center">
                            <span className="mr-2 font-medium text-text-primary md:hidden">
                                Standard:
                            </span>
                            {feature.standard}
                        </div>

                        <div className="text-text-secondary md:text-center">
                            <span className="mr-2 font-medium text-text-primary md:hidden">
                                Pro:
                            </span>
                            {feature.pro}
                        </div>

                        <div className="text-text-secondary md:text-center">
                            <span className="mr-2 font-medium text-text-primary md:hidden">
                                Elite:
                            </span>
                            {feature.elite}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}