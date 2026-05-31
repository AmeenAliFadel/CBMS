import type { BookingFormValues, CreateBookingRequest } from "./bookingTypes";

function formatBookingDateTime(value: string, time: "start" | "end") {
    const normalized = value.trim();
    const suffix = time === "start" ? "00:00:00" : "23:59:59";

    return `${normalized} ${suffix}`;
}

export function mapBookingFormToCreateRequest(
    carId: number,
    values: BookingFormValues
): CreateBookingRequest {
    return {
        car_id: carId,
        start_date: formatBookingDateTime(values.startDate, "start"),
        end_date: formatBookingDateTime(values.endDate, "end"),
    };
}