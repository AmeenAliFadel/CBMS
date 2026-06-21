import type { FormEvent } from "react";
import {
  HiClock,
  HiOutlineClock,
  HiOutlineShieldCheck,
  HiCheckCircle,
} from "react-icons/hi";

import {
  HiBolt,
  HiOutlineCalendarDays,
  HiSparkles,
} from "react-icons/hi2";

import { MdLock } from "react-icons/md";

import type { BookingFormValues } from "../../app/features/bookings/bookingTypes";
import { formatInputDate } from "../../utils/date";

interface BookingFormProps {
  form: BookingFormValues;
  onChange: (key: keyof BookingFormValues, value: string | number) => void;
  carId?: number;
  onSubmit?: (values: BookingFormValues) => void | Promise<void>;
  loading?: boolean;
  disabled?: boolean;
}

export default function BookingForm({
  form,
  onChange,
  carId = 0,
  onSubmit,
  loading = false,
  disabled = false,
}: BookingFormProps) {
  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (onSubmit) {
      void onSubmit(form);
    }
  };

  const today = formatInputDate(new Date());

  return (
    <form data-aos="fade-up" className="space-y-6" onSubmit={handleFormSubmit}>
      <section className="rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:p-6">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              Book Your Car
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select your preferred booking dates
            </p>
          </div>

          <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-primary sm:flex">
            <HiOutlineCalendarDays className="h-7 w-7" />
          </div>
        </div>

        {/* Dates */}
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          <div className="group rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-primary">
                <HiOutlineCalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Start Date
                </p>

                <span className="text-xs text-slate-500">
                  Choose reservation day
                </span>
              </div>
            </div>

            <input
              type="date"
              value={form.startDate}
              min={today}
              required
              onChange={(e) => onChange("startDate", e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          <div className="group rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-primary">
                <HiOutlineClock className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  End Date
                </p>

                <span className="text-xs text-slate-500">
                  Select return day
                </span>
              </div>
            </div>

            <input
              type="date"
              value={form.endDate}
              min={form.startDate || today}
              required
              onChange={(e) => onChange("endDate", e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* Booking Plans */}
        <div className="mt-6">
          <h3 className="mb-1 text-sm font-semibold text-text-primary">
            Booking Plan
          </h3>

          <p className="mb-4 text-xs text-slate-500">
            Select the plan that best fits your needs
          </p>

          <div className="grid gap-4">
            {/* Basic */}
            <button
              type="button"
              onClick={() => onChange("bookingPlanId", 1)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                form.bookingPlanId === 1
                  ? "border-primary bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-border hover:border-indigo-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 text-primary">
                    <HiBolt className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Basic Plan
                    </h4>

                    <p className="text-sm text-slate-500">
                      Standard booking option
                    </p>
                  </div>
                </div>

                {form.bookingPlanId === 1 && (
                  <HiCheckCircle className="h-6 w-6 text-primary" />
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>✓ Standard reservation</p>
                <p>✓ Basic support</p>
                <p>✕ Flexible cancellation</p>
              </div>
            </button>

            {/* Flexible */}
            <button
              type="button"
              onClick={() => onChange("bookingPlanId", 2)}
              className={`rounded-2xl border p-4 text-left transition-all ${
                form.bookingPlanId === 2
                  ? "border-primary bg-indigo-50 ring-2 ring-indigo-100"
                  : "border-border hover:border-indigo-200 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-100 text-amber-600">
                    <HiClock className="h-6 w-6" />
                  </div>

                  <div>
                    <h4 className="font-semibold text-text-primary">
                      Flexible Plan
                    </h4>

                    <p className="text-sm text-slate-500">
                      More flexibility and convenience
                    </p>
                  </div>
                </div>

                {form.bookingPlanId === 2 && (
                  <HiCheckCircle className="h-6 w-6 text-primary" />
                )}
              </div>

              <div className="mt-4 space-y-2 text-sm text-slate-600">
                <p>✓ Date modifications</p>
                <p>✓ Flexible cancellation</p>
                <p>✓ Priority support</p>
              </div>
            </button>
          </div>
        </div>

        {/* Features */}
        <div className="mt-6 flex flex-wrap gap-3">
          <div className="flex items-center gap-2 rounded-xl border border-border bg-indigo-50/60 px-3 py-2 text-sm text-text-primary">
            <HiBolt className="text-[18px] text-primary" />
            Fast booking
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-indigo-50/60 px-3 py-2 text-sm text-text-primary">
            <MdLock className="text-[18px] text-primary" />
            Secure reservation
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-border bg-indigo-50/60 px-3 py-2 text-sm text-text-primary">
            <HiClock className="text-[18px] text-primary" />
            Flexible timing
          </div>
        </div>

        <button
          type="submit"
          disabled={loading || disabled || carId <= 0}
          className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-70"
        >
          <HiOutlineShieldCheck className="h-5 w-5" />

          {loading ? "Confirming Booking..." : "Confirm Booking"}
        </button>
      </section>
    </form>
  );
}