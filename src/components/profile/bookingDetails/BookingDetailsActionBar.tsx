import { Link } from "react-router-dom";
import { MdCancel } from "react-icons/md";

interface BookingDetailsActionBarProps {
  canCancel: boolean;
  cancelLoading: boolean;
  onCancel: () => void;
  backTo?: string;
  statusLabel?: string;
  isBasicPlan?: boolean;
}

export default function BookingDetailsActionBar({
  canCancel,
  cancelLoading,
  onCancel,
  backTo = "/profile",
  statusLabel = "Unavailable",
  isBasicPlan = false,
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
          disabled={cancelLoading || isBasicPlan}
          className={`inline-flex w-full items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors sm:w-auto sm:min-w-44 ${
            isBasicPlan
              ? "cursor-not-allowed border border-slate-400 bg-slate-300 text-slate-600 opacity-80"
              : "border border-rose-500/30 bg-rose-500/10 text-rose-500 hover:bg-rose-500/15"
          } ${cancelLoading ? "cursor-not-allowed opacity-60" : ""}`}
        >
          <MdCancel className="text-base" />
          <span>
            {isBasicPlan
              ? "Basic Plan"
              : cancelLoading
                ? "Canceling..."
                : "Cancel Booking"}
          </span>
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
