import type { Booking } from "../app/features/bookings/bookingTypes";

export type BookingTab = "active" | "completed" | "cancelled";

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function parseBookingDateTime(value: string): Date | null {
    const trimmed = value.trim();

    if (!trimmed) {
        return null;
    }

    const [datePart, timePart = "00:00"] = trimmed.split(" ");
    const [yearRaw, monthRaw, dayRaw] = datePart.split("-");
    const [hourRaw = "0", minuteRaw = "0"] = timePart.split(":");

    const year = Number(yearRaw);
    const month = Number(monthRaw);
    const day = Number(dayRaw);
    const hour = Number(hourRaw);
    const minute = Number(minuteRaw);

    if (
        [year, month, day, hour, minute].some((value) => Number.isNaN(value))
    ) {
        return null;
    }

    return new Date(year, month - 1, day, hour, minute, 0, 0);
}

function startOfToday(): Date {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
}

function normalizeRuntimeStatus(status: Booking["status"] | string): string {
    const normalized = String(status).trim().toLowerCase();

    if (normalized === "accepted" || normalized === "approved") {
        return "approved";
    }

    if (normalized === "cancelled") {
        return "canceled";
    }

    return normalized;
}

export function normalizeBookingStatus(
    status: Booking["status"] | string
): string {
    return normalizeRuntimeStatus(status);
}

export function getBookingStatusLabel(
    status: Booking["status"] | string
): string {
    switch (normalizeBookingStatus(status)) {
        case "pending":
            return "Pending";
        case "approved":
            return "Approved";
        case "rejected":
            return "Rejected";
        case "canceled":
            return "Canceled";
        default:
            return String(status).trim();
    }
}

export function getBookingStatusClassName(
    status: Booking["status"] | string
): string {
    switch (normalizeBookingStatus(status)) {
        case "pending":
            return "border-amber-500/20 bg-amber-500/15 text-amber-500";
        case "approved":
            return "border-emerald-500/20 bg-emerald-500/15 text-emerald-500";
        case "rejected":
            return "border-rose-500/20 bg-rose-500/15 text-rose-500";
        case "canceled":
            return "border-slate-500/20 bg-slate-500/15 text-slate-400";
        default:
            return "border-primary/20 bg-primary/15 text-primary";
    }
}

export function formatBookingDate(value: string): string {
    const date = parseBookingDateTime(value);

    if (!date) {
        return value;
    }

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
    }).format(date);
}

export function formatBookingDateTime(value: string): string {
    const date = parseBookingDateTime(value);

    if (!date) {
        return value;
    }

    return new Intl.DateTimeFormat(undefined, {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
    }).format(date);
}

export function formatBookingDateRange(
    startDate: string,
    endDate: string
): string {
    return `${formatBookingDate(startDate)} - ${formatBookingDate(endDate)}`;
}

export function getBookingDurationDays(
    startDate: string,
    endDate: string
): number {
    const start = parseBookingDateTime(startDate);
    const end = parseBookingDateTime(endDate);

    if (!start || !end) {
        return 1;
    }

    const diffInDays = Math.ceil((end.getTime() - start.getTime()) / MS_PER_DAY);

    return Math.max(1, diffInDays);
}

export function formatMoney(amount: number, currency = "USD"): string {
    const safeAmount = Number.isFinite(amount) ? amount : 0;

    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency,
        maximumFractionDigits: 2,
    }).format(safeAmount);
}

export function calculateBookingTotal(booking: Booking): number {
    const pricePerDay = Number(booking.car.price_per_day);
    const safePricePerDay = Number.isFinite(pricePerDay) ? pricePerDay : 0;

    return safePricePerDay * getBookingDurationDays(booking.start_date, booking.end_date);
}

export function formatBookingTotal(booking: Booking): string {
    return formatMoney(calculateBookingTotal(booking));
}

export function getBookingTab(booking: Booking): BookingTab {
    const status = normalizeBookingStatus(booking.status);

    if (status === "rejected" || status === "canceled") {
        return "cancelled";
    }

    if (status === "approved") {
        const endDate = parseBookingDateTime(booking.end_date);

        if (endDate && endDate < startOfToday()) {
            return "completed";
        }
    }

    return "active";
}

export function isBookingCancelable(booking: Booking): boolean {
    const status = normalizeBookingStatus(booking.status);

    if (status === "rejected" || status === "canceled") {
        return false;
    }

    if (status === "pending") {
        return true;
    }

    if (status === "approved") {
        const endDate = parseBookingDateTime(booking.end_date);

        if (!endDate) {
            return true;
        }

        return endDate >= startOfToday();
    }

    return false;
}