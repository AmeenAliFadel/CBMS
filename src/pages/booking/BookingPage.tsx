"use client";

import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarCard } from "../../components/booking/CarCard";
import BookingForm from "../../components/booking/BookingForm";
import { SecureBox } from "../../components/booking/SecureBox";
import { SummaryRow } from "../../components/booking/SummaryRow";
import JourneyStep from "../../components/host/JourneyStep";
import AvailabilityCalendar, {
  type Period,
} from "../../components/booking/AvailabilityCalendar";
import { useBookingPage } from "../../app/features/bookings/useBookingPage";
import { useAppSelector } from "../../app/hooks";
import { formatCurrency } from "../../utils/currency";

export default function CarBookingResponsivePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const carId = Number(id);

  const [showCalendar, setShowCalendar] = useState(false);

  const conflictPeriods = useAppSelector(
    (state) => state.bookings.conflictPeriods
  );

  const hasConflict = conflictPeriods.length > 0;

  const booking = useBookingPage(carId, {
    onSuccess: (createdBooking) => {
      navigate("/booking-pending", {
        replace: true,
        state: { bookingId: createdBooking.id },
      });
    },
  });

  const dailyRateLabel = useMemo(() => {
    if (booking.isCarLoading) return "Loading car details...";
    return `${formatCurrency(booking.dailyRate)} × ${booking.pricing.tripDays} days`;
  }, [booking]);

  const totalLabel = useMemo(() => {
    if (booking.isCarLoading) return "Loading car details...";
    return formatCurrency(booking.pricing.total);
  }, [booking]);

  return (
    <div className="min-h-screen px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* Stepper */}
        <div className="mb-6 rounded-3xl bg-white px-4 py-5 shadow-sm ring-1 ring-slate-200">
          <div className="flex items-center">
            <JourneyStep label="Details" active />
            <div className="mx-2 h-px flex-1 bg-slate-200" />
            <JourneyStep label="Pending" />
            <div className="mx-2 h-px flex-1 bg-slate-200" />
            <JourneyStep label="Success" />
          </div>
        </div>

        {hasConflict && (
          <div className="mb-6">
            <button
              onClick={() => setShowCalendar(true)}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-red-600 underline underline-offset-2 hover:text-red-700"
            >
              <WarningIcon className="h-4 w-4" />
              View conflicting dates ({conflictPeriods.length})
            </button>
          </div>
        )}

        <CalendarModal
          open={showCalendar}
          onClose={() => setShowCalendar(false)}
          periods={conflictPeriods}
        />

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.85fr] lg:items-start">
          <BookingForm
            form={booking.form}
            onChange={booking.handleChange}
            carId={carId}
            onSubmit={booking.handleSubmit}
            loading={booking.loading}
            disabled={booking.isCarLoading}
          />

          <aside className="space-y-4 lg:sticky lg:top-6">
            <CarCard />

            <div className="rounded-3xl bg-white p-5 shadow-sm ring-1 ring-slate-200">
              <div className="space-y-3 text-sm">
                <SummaryRow label="Start Date" value={booking.form.startDate} />
                <SummaryRow label="End Date" value={booking.form.endDate} />
                <SummaryRow label="Daily rate" value={dailyRateLabel} />
                <SummaryRow
                  label="Fees"
                  value={formatCurrency(booking.pricing.fees)}
                />
              </div>

              <div className="mt-5 border-t pt-4">
                <div className="flex justify-between">
                  <span className="text-sm text-gray-500">Total</span>
                  <span className="text-2xl font-bold text-primary">
                    {totalLabel}
                  </span>
                </div>
              </div>
            </div>

            <SecureBox />
          </aside>
        </div>
      </div>
    </div>
  );
}

/* ================= MODAL ================= */

function CalendarModal({
  open,
  onClose,
  periods,
}: {
  open: boolean;
  onClose: () => void;
  periods: Period[];
}) {
  const [isMounted, setIsMounted] = useState(open);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setIsMounted(true);
      const frame = requestAnimationFrame(() => setIsVisible(true));
      return () => cancelAnimationFrame(frame);
    }

    setIsVisible(false);
    const timeout = setTimeout(() => setIsMounted(false), 220);
    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!isMounted) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMounted, onClose]);

  if (!isMounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className={[
          "absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-200",
          isVisible ? "opacity-100" : "opacity-0",
        ].join(" ")}
        onClick={onClose}
      />

      {/* Modal box */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="conflict-modal-title"
        className={[
          "relative flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-3xl bg-white shadow-2xl ring-1 ring-black/5 transition-all duration-200",
          isVisible
            ? "translate-y-0 scale-100 opacity-100"
            : "translate-y-2 scale-95 opacity-0",
        ].join(" ")}
      >
        {/* Header */}
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-slate-100 px-6 py-5">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-amber-100">
              <WarningIcon className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <h2
                id="conflict-modal-title"
                className="text-base font-semibold text-slate-900"
              >
                Conflicting Dates
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                {periods.length} overlapping{" "}
                {periods.length === 1 ? "booking" : "bookings"} found
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close"
            autoFocus
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <CloseIcon className="h-5 w-5" />
          </button>
        </div>

        {/* Content */}
        <div className="grid flex-1 grid-cols-1 gap-0 overflow-hidden lg:grid-cols-[0.9fr_1.4fr]">
          {/* Left panel */}
          <div className="border-b border-slate-100 bg-slate-50/70 p-6 lg:border-b-0 lg:border-r lg:border-slate-100">
            <p className="mb-3 text-xs font-medium uppercase tracking-wide text-slate-400">
              Already booked
            </p>

            <div className="space-y-2">
              {periods.map((period, i) => (
                <div
                  key={`${period.start}-${period.end}-${i}`}
                  className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 text-sm text-slate-700 shadow-sm ring-1 ring-slate-100"
                >
                  <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-red-500" />
                  <span className="font-medium tabular-nums">
                    {formatRange(period)}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Right panel */}
          <div className="flex items-center justify-center p-6">
            <div className="w-full max-w-4xl">
              <AvailabilityCalendar periods={periods} />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex shrink-0 justify-end border-t border-slate-100 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-xl border border-slate-200 px-5 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

/* ================= icons ================= */

function WarningIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M10.29 3.86 1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0Z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CloseIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

/* ================= helpers ================= */

// Parses "YYYY-MM-DD" as a LOCAL date, ignoring timezone.
function parseDateOnly(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function formatRange(period: Period): string {
  const start = parseDateOnly(period.start);
  const end = parseDateOnly(period.end);
  if (!start || !end) return "Invalid date range";

  const sameMonth =
    start.getMonth() === end.getMonth() &&
    start.getFullYear() === end.getFullYear();

  const startLabel = start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  const endLabel = sameMonth
    ? `${end.getDate()}, ${end.getFullYear()}`
    : end.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });

  return `${startLabel} – ${endLabel}`;
}