import { useAppSelector } from "../../../app/hooks";

interface StatsRowProps {
  rating: number;
}

export default function StatsRow({ rating }: StatsRowProps) {
  const bookingsCount = useAppSelector(
    (state) => state.bookings.items.length
  );

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center justify-center border border-border rounded-xl px-6 py-2 gap-0.5 shadow-sm">
        <span className="text-base font-bold text-primary">
          {bookingsCount}
        </span>
        <span className="text-xs text-text-secondary">
          bookings
        </span>
      </div>

      <div className="flex flex-col items-center justify-center border border-border rounded-xl px-6 py-2 gap-0.5 shadow-sm">
        <span className="text-base font-bold text-primary">
          {rating}
        </span>
        <span className="text-xs text-text-secondary">
          Rating
        </span>
      </div>
    </div>
  );
}