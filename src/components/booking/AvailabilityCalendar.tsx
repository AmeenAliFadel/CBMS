

import { useMemo, useState } from "react";

type Period = {
  start: string;
  end: string;
};

interface Props {
  periods: Period[];
}

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export default function AvailabilityCalendar({ periods }: Props) {
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return new Date(now.getFullYear(), now.getMonth(), 1);
  });

  const bookedDays = useMemo(() => {
    const set = new Set<string>();

    periods.forEach((p) => {
      const start = parseDateOnly(p.start);
      const end = parseDateOnly(p.end);

      if (!start || !end) return;

      const current = new Date(start);
      while (current <= end) {
        set.add(formatKey(current));
        current.setDate(current.getDate() + 1);
      }
    });

    return set;
  }, [periods]);

  const days = useMemo(() => generateCalendarDays(viewDate), [viewDate]);

  const bookedCount = useMemo(
    () => days.filter((d) => d && bookedDays.has(formatKey(d))).length,
    [days, bookedDays]
  );

  if (!periods.length) return null;

  const monthLabel = viewDate.toLocaleDateString("en-US", {
    month: "long",
    year: "numeric",
  });

  const goToPrevMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1));
  const goToNextMonth = () =>
    setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1));

  const todayKey = formatKey(new Date());

  return (
    <div className="w-full rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-lg font-semibold tracking-tight text-slate-900">
            Availability Calendar
          </h3>
          <p className="mt-1 text-sm text-slate-500">
            {bookedCount > 0
              ? `${bookedCount} ${bookedCount === 1 ? "day" : "days"} booked this month`
              : "No bookings this month"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={goToPrevMonth}
            aria-label="Previous month"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <ChevronIcon direction="left" />
          </button>

          <span className="min-w-[180px] text-center text-base font-semibold tabular-nums text-slate-800">
            {monthLabel}
          </span>

          <button
            type="button"
            onClick={goToNextMonth}
            aria-label="Next month"
            className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-slate-100 hover:text-slate-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400"
          >
            <ChevronIcon direction="right" />
          </button>
        </div>
      </div>

      {/* Week labels */}
      <div className="mb-3 grid grid-cols-7 text-center text-xs font-medium uppercase tracking-wide text-slate-400">
        {WEEKDAYS.map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>

      {/* Calendar grid */}
      <div className="grid grid-cols-7 gap-3">
        {days.map((day, i) => {
          if (!day) {
            return <div key={`pad-${i}`} aria-hidden className="h-14 w-full" />;
          }

          const key = formatKey(day);
          const isBooked = bookedDays.has(key);
          const isToday = key === todayKey;

          return (
            <div
              key={key}
              title={isBooked ? "Booked" : "Available"}
              className={[
                "relative flex h-14 w-full items-center justify-center rounded-2xl text-base tabular-nums transition",
                isBooked
                  ? "font-semibold text-red-700"
                  : "bg-slate-50 text-slate-700 hover:bg-slate-100",
                isToday ? "ring-2 ring-inset ring-slate-900" : "",
              ].join(" ")}
              style={
                isBooked
                  ? {
                      backgroundColor: "#fef2f2",
                      backgroundImage:
                        "repeating-linear-gradient(135deg, rgba(220,38,38,0.10) 0px, rgba(220,38,38,0.10) 2px, transparent 2px, transparent 7px)",
                    }
                  : undefined
              }
            >
              {day.getDate()}
            </div>
          );
        })}
      </div>

      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center gap-5 border-t border-slate-100 pt-4 text-sm text-slate-500">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-slate-50 ring-1 ring-slate-200" />
          Available
        </div>
        <div className="flex items-center gap-2">
          <span
            className="h-3 w-3 rounded-full ring-1 ring-red-200"
            style={{
              backgroundColor: "#fef2f2",
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(220,38,38,0.18) 0px, rgba(220,38,38,0.18) 1.5px, transparent 1.5px, transparent 4px)",
            }}
          />
          Booked
        </div>
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full ring-2 ring-inset ring-slate-900" />
          Today
        </div>
      </div>
    </div>
  );
}

/* ================= small icon ================= */

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4"
    >
      <polyline points={direction === "left" ? "15 18 9 12 15 6" : "9 18 15 12 9 6"} />
    </svg>
  );
}

/* ================= helpers ================= */

// Formats a Date using its LOCAL calendar components (not UTC), so the key
// always matches the day the user actually sees rendered in the grid.
function formatKey(date: Date) {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}

// Parses a "YYYY-MM-DD" (optionally with a time suffix) as a LOCAL date,
// ignoring timezone entirely.
function parseDateOnly(value: string): Date | null {
  const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (!match) return null;

  const [, year, month, day] = match;
  const date = new Date(Number(year), Number(month) - 1, Number(day));
  return Number.isNaN(date.getTime()) ? null : date;
}

function generateCalendarDays(viewDate: Date): (Date | null)[] {
  const start = new Date(viewDate.getFullYear(), viewDate.getMonth(), 1);
  const end = new Date(viewDate.getFullYear(), viewDate.getMonth() + 1, 0);

  const days: (Date | null)[] = [];

  for (let i = 0; i < start.getDay(); i++) {
    days.push(null);
  }

  for (let d = 1; d <= end.getDate(); d++) {
    days.push(new Date(viewDate.getFullYear(), viewDate.getMonth(), d));
  }

  return days;
}