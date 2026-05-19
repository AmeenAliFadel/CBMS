// import { useState } from "react";
// import { CarCard } from "../../components/booking/CarCard";
// import { SummaryRow } from "../../components/booking/SummaryRow";
// import { SecureBox } from "../../components/booking/SecureBox";
// import BookingForm from "../../components/booking/BookingForm";
// import JourneyStep from "../../components/host/JourneyStep";


// export default function CarBookingResponsivePage() {
//   const [form, setForm] = useState({
//     date: "2026-05-22",
//     time: "12:30",
//   });

//   const handleChange = (key: string, value: string) => {
//     setForm((prev) => ({
//       ...prev,
//       [key]: value,
//     }));
//   };

//   return (
//     <div className="min-h-screen px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-10">
//       <div className="mx-auto max-w-6xl">
//         {/* STEPPER */}
//         <div className="mb-6 rounded-3xl bg-white px-4 py-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:px-6">
//           <div className="flex items-center">
//             <JourneyStep label="Details" active />
//             <div className="mx-2 h-px flex-1 bg-slate-200" />
//             <JourneyStep label="Pending" />
//             <div className="mx-2 h-px flex-1 bg-slate-200" />
//             <JourneyStep label="Success" />
//           </div>
//         </div>

//         <div className="grid gap-6 lg:grid-cols-[1.55fr_0.85fr] lg:items-start">
//           {/* LEFT */}
//           <BookingForm form={form} onChange={handleChange} />

//           {/* RIGHT */}
//           <aside className="space-y-4 lg:sticky lg:top-6">
//             <CarCard />

//             <div className="rounded-3xl bg-white p-5 shadow-[0_14px_40px_rgba(99,102,241,0.1)] ring-1 ring-slate-200/70">
//               <div className="space-y-3 text-sm text-text-primary">
//                 <SummaryRow label="Booking Date" value={form.date} />
//                 <SummaryRow label="Booking Time" value={form.time} />
//                 <SummaryRow label="Daily rate" value="$240 × 3 days" />
//                 <SummaryRow label="Fees" value="$45.00" />
//               </div>

//               <div className="mt-5 border-t border-border pt-4">
//                 <div className="flex items-end justify-between">
//                   <div>
//                     <p className="text-sm text-slate-500">Total</p>
//                     <div className="text-3xl font-bold text-primary">
//                       $968.40
//                     </div>
//                   </div>

//                   <span className="rounded-full bg-slate-100 px-2 py-1 text-xs text-slate-600">
//                     USD
//                   </span>
//                 </div>
//               </div>
//             </div>

//             <SecureBox />
//           </aside>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useMemo, useState } from "react";
import { CarCard } from "../../components/booking/CarCard";
import { SummaryRow } from "../../components/booking/SummaryRow";
import { SecureBox } from "../../components/booking/SecureBox";
import BookingForm from "../../components/booking/BookingForm";
import JourneyStep from "../../components/host/JourneyStep";

type BookingFormValues = {
  date: string;
  time: string;
};

export default function CarBookingResponsivePage() {
  const [form, setForm] = useState<BookingFormValues>({
    date: "2026-05-22",
    time: "12:30",
  });

  const handleChange = (key: keyof BookingFormValues, value: string) => {
    setForm((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const dailyRate = 240;
  const bookingDays = 3;
  const fees = 45;

  const subtotal = useMemo(() => dailyRate * bookingDays, [dailyRate, bookingDays]);
  const total = useMemo(() => subtotal + fees, [subtotal, fees]);

  const money = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 2,
    }).format(value);

  return (
    <div className="min-h-screen px-4 py-6 text-text-primary sm:px-6 lg:px-8 lg:py-10">
      <div className="mx-auto max-w-6xl">
        {/* STEPPER */}
        <div className="mb-6 rounded-3xl bg-white px-4 py-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:px-6">
          <div className="flex items-center">
            <JourneyStep label="Details" active />
            <div className="mx-2 h-px flex-1 bg-slate-200" />
            <JourneyStep label="Pending" />
            <div className="mx-2 h-px flex-1 bg-slate-200" />
            <JourneyStep label="Success" />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.55fr_0.85fr] lg:items-start">
          {/* LEFT */}
          <BookingForm form={form} onChange={handleChange} />

          {/* RIGHT */}
          <aside className="space-y-4 lg:sticky lg:top-6">
            <CarCard />

            <div className="rounded-3xl bg-white p-5 shadow-[0_14px_40px_rgba(99,102,241,0.1)] ring-1 ring-slate-200/70">
              <div className="space-y-3 text-sm text-text-primary">
                <SummaryRow label="Booking Date" value={form.date} />
                <SummaryRow label="Booking Time" value={form.time} />
                <SummaryRow label="Daily rate" value={`${money(dailyRate)} × ${bookingDays} days`} />
                <SummaryRow label="Fees" value={money(fees)} />
              </div>

              <div className="mt-5 border-t border-border pt-4">
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-sm text-slate-500">Total</p>
                    <div className="text-3xl font-bold text-primary">
                      {money(total)}
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