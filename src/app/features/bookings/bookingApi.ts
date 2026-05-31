import { api } from "../../../services/axios";
import type {
    BookingCancelResponse,
    BookingResponse,
    BookingsResponse,
    CreateBookingRequest,
} from "./bookingTypes";

export async function createBooking(payload: CreateBookingRequest) {
    const response = await api.post<BookingResponse>("/v1/bookings", payload);
    return response.data;
}

export async function getBookings(page = 1) {
    const response = await api.get<BookingsResponse>("/v1/bookings", {
        params: {
            page,
        },
    });

    return response.data;
}

export async function getBookingById(bookingId: number) {
    const response = await api.get<BookingResponse>(`/v1/bookings/${bookingId}`);
    return response.data;
}

export async function cancelBooking(bookingId: number) {
    const response = await api.delete<BookingCancelResponse>(
        `/v1/bookings/${bookingId}`
    );
    return response.data;
}