export function formatInputDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");

    return `${year}-${month}-${day}`;
}

export function parseBookingDate(value: string) {
    const normalized = value.includes("T") ? value : value.replace(" ", "T");
    return new Date(normalized);
}

export function isValidBookingDate(value: string) {
    const date = parseBookingDate(value);
    return !Number.isNaN(date.getTime());
}

export function calculateTripDays(startDate: string, endDate: string) {
    const start = parseBookingDate(startDate);
    const end = parseBookingDate(endDate);

    if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
        return 1;
    }

    const diff = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    return Math.max(1, diff || 1);
}