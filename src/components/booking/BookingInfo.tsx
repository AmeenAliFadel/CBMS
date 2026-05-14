import { HiBolt, HiCalendarDays, HiClock } from "react-icons/hi2";
import { MdLock } from "react-icons/md";

export function BookingInfo() {
  return (
    <section className="rounded-3xl border border-border bg-linear-to-br from-indigo-50 via-white to-white p-6 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-text-primary">
            Smart Booking Flow
          </h3>

          <p className="mt-2 text-sm leading-6 text-text-primary">
            Your booking process is optimized for speed and simplicity...
          </p>

          <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
            <Item icon={<HiBolt />} text="Fast checkout" />
            <Item icon={<MdLock />} text="Secure system" />
            <Item icon={<HiCalendarDays />} text="Date-based booking" />
            <Item icon={<HiClock />} text="Flexible time control" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Item({ icon, text }: any) {
  return (
    <div className="flex items-center gap-2 rounded-xl border border-border bg-white px-3 py-2 text-sm text-text-primary">
      <span className="text-primary">{icon}</span>
      {text}
    </div>
  );
}