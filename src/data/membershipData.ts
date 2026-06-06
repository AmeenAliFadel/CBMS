import { FaUser, FaStar, FaCheckCircle } from "react-icons/fa";

export type MembershipPlanId = "standard" | "pro" | "elite";

export interface MembershipPlan {
    id: MembershipPlanId;
    name: string;
    price: string;
    period: string;
    description: string;
    badge?: string;
    highlight?: boolean;
    current?: boolean;
    ctaLabel: string;
    icon: React.ElementType;
    benefits: string[];
}

export interface ComparisonFeature {
    label: string;
    standard: string;
    pro: string;
    elite: string;
}

export const membershipPlans: MembershipPlan[] = [
    {
        id: "standard",
        name: "Standard",
        price: "Free",
        period: "",
        description: "Basic inventory access and standard support.",
        current: true,
        ctaLabel: "Current Plan",
        icon: FaUser,
        benefits: [
            "Basic inventory access",
            "Standard support",
            "No priority booking",
        ],
    },
    {
        id: "pro",
        name: "Pro",
        price: "$99",
        period: "/month",
        description: "Priority booking access with lower service fees.",
        badge: "Most Popular",
        highlight: true,
        ctaLabel: "Upgrade Now",
        icon: FaStar,
        benefits: [
            "0% service fee",
            "24/7 priority support",
            "Early access to new arrivals",
            "Dedicated concierge",
        ],
    },
    {
        id: "elite",
        name: "Elite",
        price: "$249",
        period: "/month",
        description: "The ultimate luxury automotive experience.",
        badge: "VIP",
        ctaLabel: "Go Elite",
        icon: FaCheckCircle,
        benefits: [
            "All Pro features",
            "VIP event access",
            "Home delivery & pickup",
            "Multi-car discount",
        ],
    },
];

export const comparisonFeatures: ComparisonFeature[] = [
    {
        label: "Commission rate",
        standard: "5%",
        pro: "0%",
        elite: "0%",
    },
    {
        label: "Visibility",
        standard: "Standard",
        pro: "High",
        elite: "VIP",
    },
    {
        label: "Support",
        standard: "Email",
        pro: "24/7 Priority",
        elite: "Concierge",
    },
    {
        label: "New arrivals",
        standard: "Regular",
        pro: "Early access",
        elite: "First access",
    },
];
export const getMembershipPlanById = (
    planId: string | null
): MembershipPlan => {
    const plan = membershipPlans.find(
        (item) => item.id === planId
    );

    return plan ?? membershipPlans[1];
};