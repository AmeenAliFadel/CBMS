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

    if (!values.bookingPlanId) {
        throw new Error("Booking plan is required");
    }

    if (!values.startDate || !values.endDate) {
        throw new Error("Dates are required");
    }

    return {
        car_id: carId,
        booking_plan_id: values.bookingPlanId,
        start_date: values.startDate + " 00:00:00",
        end_date: values.endDate + " 23:59:59",
    };
}