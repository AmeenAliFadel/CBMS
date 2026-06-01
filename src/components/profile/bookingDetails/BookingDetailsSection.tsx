import type { ReactNode } from "react";

interface BookingDetailsSectionProps {
    title: string;
    description?: string;
    children: ReactNode;
    className?: string;
}

export default function BookingDetailsSection({
    title,
    description,
    children,
    className = "",
}: BookingDetailsSectionProps) {
    return (
        <section className={`rounded-2xl border border-border bg-surface p-4 sm:p-5 ${className}`}>
            <div className="mb-4">
                <h2 className="text-base font-bold text-text-primary sm:text-lg">
                    {title}
                </h2>
                {description ? (
                    <p className="mt-1 text-sm leading-6 text-text-secondary">
                        {description}
                    </p>
                ) : null}
            </div>
            <div className="min-w-0">{children}</div>
        </section>
    );
}