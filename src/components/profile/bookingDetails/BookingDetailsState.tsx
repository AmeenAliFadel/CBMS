import { Link } from "react-router-dom";
import type { ReactNode } from "react";

interface BookingDetailsStateProps {
    title: string;
    description: string;
    actionLabel: string;
    actionTo: string;
    icon: ReactNode;
}

export default function BookingDetailsState({
    title,
    description,
    actionLabel,
    actionTo,
    icon,
}: BookingDetailsStateProps) {
    return (
        <div className="min-h-screen bg-background px-3 py-4 sm:px-4 sm:py-6">
            <div className="mx-auto flex w-full max-w-6xl flex-col gap-4">
                <Link
                    to="/profile"
                    className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary"
                >
                    Back to profile
                </Link>

                <div className="flex flex-1 items-center justify-center rounded-2xl border border-border bg-surface px-5 py-16 text-center sm:px-6 sm:py-20">
                    <div className="max-w-md">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-border bg-background">
                            {icon}
                        </div>

                        <h1 className="mt-5 text-xl font-bold text-text-primary sm:text-2xl">
                            {title}
                        </h1>

                        <p className="mt-2 text-sm leading-6 text-text-secondary">
                            {description}
                        </p>

                        <Link
                            to={actionTo}
                            className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-auto"
                        >
                            {actionLabel}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}