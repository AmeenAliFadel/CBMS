export interface FaqItem {
    id: number;
    question: string;
    answer: string;
}

export const faqData: FaqItem[] = [
    {
        id: 1,
        question: "How does the delivery service work?",
        answer:
            "We offer door-to-door delivery within a 50-mile radius of our hub locations. Your concierge will coordinate the exact time and location for a seamless hand-off.",
    },
    {
        id: 2,
        question: "What insurance coverage is provided?",
        answer:
            "All vehicles include comprehensive and collision coverage with a $500 deductible. Additional coverage options are available at checkout, including zero-deductible plans and international coverage.",
    },
    {
        id: 3,
        question: "Can I request a specific vehicle model?",
        answer:
            "Absolutely. Our concierge team can source virtually any luxury or exotic vehicle upon request. Special model requests typically require 48–72 hours advance notice depending on availability.",
    },
    {
        id: 4,
        question: "What are the age and license requirements?",
        answer:
            "Drivers must be at least 25 years old and hold a valid driver's license for a minimum of 3 years. International licenses are accepted with a valid passport.",
    },
    {
        id: 5,
        question: "Is there a minimum rental period?",
        answer:
            "Our standard minimum rental is 24 hours. For exotic and ultra-luxury vehicles, a 3-day minimum may apply. Contact our concierge team for bespoke arrangements.",
    },
    {
        id: 6,
        question: "How do I modify or cancel my reservation?",
        answer:
            "Reservations can be modified or cancelled up to 48 hours before pickup at no charge. Cancellations within 48 hours are subject to a one-day rental fee.",
    },
];