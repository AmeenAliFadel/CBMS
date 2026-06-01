export default function StatsRow({ trips, rating }: { trips: number; rating: number }) {
  return (
    <div className="flex gap-3">

      {/* Trips Stat */}
      <div className="flex flex-col items-center justify-center border border-border rounded-xl px-6 py-2 gap-0.5 shadow-sm">
        <span className="text-base font-bold text-primary">{trips}</span>
        <span className="text-xs text-text-secondary">bookings</span>
      </div>

      {/* Rating Stat */}
      <div className="flex flex-col items-center justify-center border border-border rounded-xl px-6 py-2 gap-0.5 shadow-sm">
        <span className="text-base font-bold text-primary">{rating}</span>
        <span className="text-xs text-text-secondary">Rating</span>
      </div>

    </div>
  )
}