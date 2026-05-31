import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CarCard } from "../../components/booking/CarCard";
import BookingForm from "../../components/booking/BookingForm";
import { SecureBox } from "../../components/booking/SecureBox";
import { SummaryRow } from "../../components/booking/SummaryRow";
import JourneyStep from "../../components/host/JourneyStep";
import { useBookingPage } from "../../app/features/bookings/useBookingPage";
import { formatCurrency } from "../../utils/currency";

export default function CarBookingResponsivePage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const carId = Number(id);

  const booking = useBookingPage(carId, {
    onSuccess: (createdBooking) => {
      navigate("/booking-pending", {
        replace: true,
        state: {
          bookingId: createdBooking.id,
        },
      });
    },
  });

  const dailyRateLabel = useMemo(() => {
    if (booking.isCarLoading) {
      return "Loading car details...";
    }

    return `${formatCurrency(booking.dailyRate)} × ${booking.pricing.tripDays} days`;
  }, [booking.dailyRate, booking.isCarLoading, booking.pricing.tripDays]);

  const totalLabel = useMemo(() => {
    if (booking.isCarLoading) {
      return "Loading car details...";
    }

    return formatCurrency(booking.pricing.total);
  }, [booking.isCarLoading, booking.pricing.total]);

  return (
    <div className="min-h-screen px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        <div
          data-aos="fade-up"
          className="mb-6 rounded-3xl bg-white px-4 py-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:px-6"
        >
          <div className="flex items-center">
            <JourneyStep label="Details" active />
            <div className="mx-2 h-px flex-1 bg-slate-200" />
            <JourneyStep label="Pending" />
            <div className="mx-2 h-px flex-1 bg-slate-200" />
            <JourneyStep label="Success" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.85fr] lg:items-start">
          <BookingForm
            form={booking.form}
            onChange={booking.handleChange}
            carId={carId}
            onSubmit={booking.handleSubmit}
            loading={booking.loading}
            disabled={booking.isCarLoading}
            error={booking.error}
          />

          <aside data-aos="fade-up" className="space-y-4 lg:sticky lg:top-6">
            <CarCard />

            <div className="rounded-3xl bg-white p-5 shadow-[0_14px_40px_rgba(99,102,241,0.1)] ring-1 ring-slate-200/70">
              <div className="space-y-3 text-sm text-text-primary">
                <SummaryRow
                  label="Booking Start Date"
                  value={booking.form.startDate}
                />
                <SummaryRow
                  label="Booking End Date"
                  value={booking.form.endDate}
                />
                <SummaryRow label="Daily rate" value={dailyRateLabel} />
                <SummaryRow
                  label="Fees"
                  value={formatCurrency(booking.pricing.fees)}
                />
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total</p>
                    <div className="text-3xl font-bold text-primary">
                      {totalLabel}
                    </div>
                  </div>

                  <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
                    USD
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