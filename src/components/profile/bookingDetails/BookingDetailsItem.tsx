import type { ReactNode } from "react";

interface BookingDetailsItemProps {
    label: string;
    value: ReactNode;
    className?: string;
    valueClassName?: string;
}

export default function BookingDetailsItem({
    label,
    value,
    className = "",
    valueClassName = "",
}: BookingDetailsItemProps) {
    return (
        <div
            className={`min-w-0 rounded-xl border border-border bg-background px-3 py-3 sm:px-4 ${className}`}
        >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-text-secondary">
                {label}
            </p>
            <div
                className={`mt-1 min-w-0 wrap-break-word text-sm font-semibold leading-6 text-text-primary ${valueClassName}`}
            >
                {value}
            </div>
        </div>
    );
}