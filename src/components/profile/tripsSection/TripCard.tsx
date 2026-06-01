import { Link } from "react-router-dom";
import { MdArrowForward, MdDateRange, MdDirectionsCar, MdPerson } from "react-icons/md";

import carImageSrc from "../../../assets/dashboardImages/carImage.webp";
import type { Booking } from "../../../app/features/bookings/bookingTypes";
import {
  formatBookingDateRange,
  formatBookingTotal,
  getBookingStatusClassName,
  getBookingStatusLabel,
  getBookingTab,
  isBookingCancelable,
} from "../../../utils/bookingDisplay";

interface TripCardProps {
  booking: Booking;
  onCancel: (bookingId: number) => void;
  cancelLoading?: boolean;
}

export default function TripCard({
  booking,
  onCancel,
  cancelLoading = false,
}: TripCardProps) {
  const statusLabel = getBookingStatusLabel(booking.status);
  const statusClassName = getBookingStatusClassName(booking.status);
  const bookingTab = getBookingTab(booking);
  const canCancel = isBookingCancelable(booking);
  const total = formatBookingTotal(booking);
  const dates = formatBookingDateRange(booking.start_date, booking.end_date);

  const secondaryLabel =
    bookingTab === "completed"
      ? "Completed"
      : bookingTab === "cancelled"
        ? "Cancelled"
        : statusLabel;

  return (
    <div className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface md:flex-row">
      <div className="relative h-44 w-full md:h-auto md:w-48 md:flex-shrink-0">
        <img
          src={carImageSrc}
          alt={booking.car.title}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          className={`absolute left-3 top-3 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${statusClassName}`}
        >
          {statusLabel}
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-text-secondary">
              Booking #{booking.id}
            </p>
            <h3 className="mt-1 truncate text-base font-bold text-text-primary">
              {booking.car.title}
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              {booking.car.brand} • {booking.car.model}
            </p>
          </div>

          <div className="flex shrink-0 flex-col items-end">
            <span className="text-xs text-text-secondary">Total</span>
            <span className="text-base font-bold text-primary">{total}</span>
          </div>
        </div>

        <div className="flex items-center gap-2 text-text-secondary">
          <MdDateRange className="shrink-0 text-base" />
          <span className="text-sm">{dates}</span>
        </div>

        <div className="flex items-start gap-2 text-text-secondary">
          <MdPerson className="mt-0.5 shrink-0 text-base" />
          <div className="flex flex-col">
            <span className="text-sm">{booking.customer.name}</span>
            <span className="text-xs text-text-secondary">
              {booking.customer.email}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-text-secondary">
            {booking.car.brand}
          </span>
          <span className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-text-secondary">
            {booking.car.model}
          </span>
          <span className="rounded-lg border border-border px-3 py-1 text-xs font-medium text-text-secondary">
            #{booking.id}
          </span>
        </div>

        <div className="mt-1 flex items-center gap-3 md:justify-end">
          <Link
            to={`/profile/bookings/${booking.id}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-background md:flex-none md:min-w-40"
          >
            <span>View Details</span>
            <MdArrowForward className="text-base" />
          </Link>

          {canCancel ? (
            <button
              type="button"
              onClick={() => onCancel(booking.id)}
              disabled={cancelLoading}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-sm font-semibold text-rose-500 transition-colors hover:bg-rose-500/15 disabled:cursor-not-allowed disabled:opacity-60 md:flex-none md:min-w-40"
            >
              <span>{cancelLoading ? "Canceling..." : "Cancel Booking"}</span>
            </button>
          ) : (
            <button
              type="button"
              disabled
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold text-text-secondary opacity-80 disabled:cursor-not-allowed md:flex-none md:min-w-40"
            >
              <span>{secondaryLabel}</span>
              <MdDirectionsCar className="text-base" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}