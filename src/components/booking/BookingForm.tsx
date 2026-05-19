// import { useState } from "react";
// import { HiClock, HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";
// import { BookingInfo } from "./BookingInfo";
// import { HiBolt, HiOutlineCalendarDays } from "react-icons/hi2";
// import { MdLock } from "react-icons/md";

// export default function BookingForm() {
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

//   const handleSubmit = () => {
//     const payload = {
//       car_id: 5,
//       scheduled_at: `${form.date} ${form.time}:00`,
//     };

//     console.log("API PAYLOAD:", payload);
//   };

//   return (
//     <div className="space-y-6">
//       {/* BOOKING FORM */}
//       <section className="rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:p-6">
//         {/* HEADER */}
//         <div className="flex items-center justify-between gap-4">
//           <div>
//             <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
//               Book Your Car
//             </h2>

//             <p className="mt-1 text-sm text-slate-500">
//               Select your preferred booking date and time
//             </p>
//           </div>

//           <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-primary sm:flex">
//             <HiOutlineCalendarDays className="h-7 w-7" />
//           </div>
//         </div>

//         {/* DATE + TIME */}
//         <div className="mt-7 grid gap-4 md:grid-cols-2">
//           {/* DATE */}
//           <div className="group rounded-2xl border border-border bg-linear-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-200 hover:shadow-md">
//             <div className="mb-4 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-primary">
//                 <HiOutlineCalendarDays className="h-5 w-5" />
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-text-primary">
//                   Booking Date
//                 </p>
//                 <span className="text-xs text-slate-500">
//                   Choose reservation day
//                 </span>
//               </div>
//             </div>

//             <input
//               type="date"
//               value={form.date}
//               onChange={(e) => handleChange("date", e.target.value)}
//               className="h-13 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>

//           {/* TIME */}
//           <div className="group rounded-2xl border border-border bg-linear-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-200 hover:shadow-md">
//             <div className="mb-4 flex items-center gap-3">
//               <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-primary">
//                 <HiOutlineClock className="h-5 w-5" />
//               </div>

//               <div>
//                 <p className="text-sm font-semibold text-text-primary">
//                   Booking Time
//                 </p>
//                 <span className="text-xs text-slate-500">
//                   Select preferred hour
//                 </span>
//               </div>
//             </div>

//             <input
//               type="time"
//               value={form.time}
//               onChange={(e) => handleChange("time", e.target.value)}
//               className="h-13 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
//             />
//           </div>
//         </div>

//         {/* QUICK INFO */}
//         <div className="mt-6 flex flex-wrap gap-3">
//           <div className="flex items-center gap-2 rounded-xl border border-border bg-indigo-50/60 px-3 py-2 text-sm text-text-primary">
//             <HiBolt className="text-[18px] text-primary" />
//             Fast booking
//           </div>

//           <div className="flex items-center gap-2 rounded-xl border border-border bg-indigo-50/60 px-3 py-2 text-sm text-text-primary">
//             <MdLock className="text-[18px] text-primary" />
//             Secure reservation
//           </div>

//           <div className="flex items-center gap-2 rounded-xl border border-border bg-indigo-50/60 px-3 py-2 text-sm text-text-primary">
//             <HiClock className="text-[18px] text-primary" />
//             Flexible timing
//           </div>
//         </div>

//         {/* BUTTON */}
//         <button
//           onClick={handleSubmit}
//           className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
//         >
//           <HiOutlineShieldCheck className="h-5 w-5" />
//           Confirm Booking
//         </button>
//       </section>

//       {/* INFO SECTION */}
//       <BookingInfo />
//     </div>
//   );
// }


import { HiClock, HiOutlineClock, HiOutlineShieldCheck } from "react-icons/hi";
import { HiBolt, HiOutlineCalendarDays } from "react-icons/hi2";
import { MdLock } from "react-icons/md";

import { BookingInfo } from "./BookingInfo";

type BookingFormValues = {
  date: string;
  time: string;
};

interface BookingFormProps {
  form: BookingFormValues;
  onChange: (key: keyof BookingFormValues, value: string) => void;
  carId?: number;
  onSubmit?: (payload: {
    car_id: number;
    scheduled_at: string;
  }) => void;
}

export default function BookingForm({
  form,
  onChange,
  carId = 5,
  onSubmit,
}: BookingFormProps) {
  const handleSubmit = () => {
    const payload = {
      car_id: carId,
      scheduled_at: `${form.date} ${form.time}:00`,
    };

    if (onSubmit) {
      onSubmit(payload);
      return;
    }

    console.log("API PAYLOAD:", payload);
  };

  return (
    <div className="space-y-6">
      {/* BOOKING FORM */}
      <section className="rounded-3xl bg-white p-5 shadow-[0_10px_30px_rgba(99,102,241,0.08)] ring-1 ring-slate-200/70 sm:p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight text-text-primary">
              Book Your Car
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Select your preferred booking date and time
            </p>
          </div>

          <div className="hidden h-14 w-14 items-center justify-center rounded-2xl bg-indigo-600/10 text-primary sm:flex">
            <HiOutlineCalendarDays className="h-7 w-7" />
          </div>
        </div>

        {/* DATE + TIME */}
        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {/* DATE */}
          <div className="group rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-primary">
                <HiOutlineCalendarDays className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Booking Date
                </p>
                <span className="text-xs text-slate-500">
                  Choose reservation day
                </span>
              </div>
            </div>

            <input
              type="date"
              value={form.date}
              onChange={(e) => onChange("date", e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>

          {/* TIME */}
          <div className="group rounded-2xl border border-border bg-gradient-to-br from-slate-50 to-white p-4 transition-all hover:border-indigo-200 hover:shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-600/10 text-primary">
                <HiOutlineClock className="h-5 w-5" />
              </div>

              <div>
                <p className="text-sm font-semibold text-text-primary">
                  Booking Time
                </p>
                <span className="text-xs text-slate-500">
                  Select preferred hour
                </span>
              </div>
            </div>

            <input
              type="time"
              value={form.time}
              onChange={(e) => onChange("time", e.target.value)}
              className="h-12 w-full rounded-2xl border border-border bg-white px-4 text-sm font-medium text-text-primary outline-none transition focus:border-indigo-400 focus:ring-4 focus:ring-indigo-100"
            />
          </div>
        </div>

        {/* QUICK INFO */}
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

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="mt-7 flex h-14 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 transition-all hover:-translate-y-0.5 hover:bg-indigo-700"
        >
          <HiOutlineShieldCheck className="h-5 w-5" />
          Confirm Booking
        </button>
      </section>

      {/* INFO SECTION */}
      <BookingInfo />
    </div>
  );
}