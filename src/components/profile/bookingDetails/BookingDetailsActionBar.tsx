import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

interface BookingDetailsActionBarProps {
    canCancel: boolean;
    cancelLoading: boolean;
    onCancel: () => void;
    backTo?: string;
    statusLabel?: string;
}

export default function BookingDetailsActionBar({
    canCancel,
    cancelLoading,
    onCancel,
    backTo = "/profile",
    statusLabel = "Unavailable",
}: BookingDetailsActionBarProps) {
    return (
        <div className="flex flex-col gap-3 rounded-2xl border border-border bg-surface p-4 sm:flex-row sm:items-center sm:justify-between sm:p-5">
            <Link
                to={backTo}
                className="inline-flex w-full items-center justify-center rounded-xl border border-border px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-background sm:w-auto sm:min-w-44"
            >
                Back to profile
            </Link>

            {canCancel ? (
                <button
                    type="button"
                    onClick={onCancel}
                    disabled={cancelLoading}
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:min-w-44"
                >
                    <MdCancel className="text-base" />
                    <span>{cancelLoading ? "Canceling..." : "Cancel Booking"}</span>
                </button>
            ) : (
                <button
                    type="button"
                    disabled
                    className="inline-flex w-full items-center justify-center rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-text-secondary opacity-80 sm:w-auto sm:min-w-44"
                >
                    {statusLabel}
                </button>
            )}
        </div>
    );
}