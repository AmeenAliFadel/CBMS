import type { User } from "../auth/authTypes";

export type BookingStatus = "pending" | "accepted" | "rejected" | "canceled";

export interface BookingCarSummary {
    id: number;
    title: string;
    brand: string;
    model: string;
    price_per_day: string;
    images?: BookingCarImage[];
}

export interface Booking {
    id: number;
    status: BookingStatus;
    start_date: string;
    end_date: string;
    notes: string | null;
    rejection_reason: string | null;
    car: BookingCarSummary;
    customer: User;
    employee: User | null;
}

export interface BookingFormValues {
    startDate: string;
    endDate: string;
}

export interface DraftBooking {
    carId: number;
    startDate: string;
    endDate: string;
    pickupLocation: string;
}

export interface CreateBookingRequest {
    car_id: number;
    start_date: string;
    end_date: string;
}

export interface BookingCancelResponse {
    message: string;
}

export interface BookingLinks {
    first: string | null;
    last: string | null;
    prev: string | null;
    next: string | null;
}

export interface BookingMetaLink {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
}

export interface BookingMeta {
    current_page: number;
    from: number | null;
    last_page: number;
    links: BookingMetaLink[];
    path: string;
    per_page: number;
    to: number | null;
    total: number;
}

export interface BookingResponse {
    message?: string;
    data: Booking;
}

export interface BookingsResponse {
    data: Booking[];
    links: BookingLinks;
    meta: BookingMeta;
}

export interface BookingPricingBreakdown {
    tripDays: number;
    subtotal: number;
    airportDelivery: number;
    tripProtection: number;
    total: number;
}

export interface BookingSummaryPricing {
    tripDays: number;
    subtotal: number;
    fees: number;
    total: number;
}

export interface BookingState {
    items: Booking[];
    selectedBooking: Booking | null;
    draftBooking: DraftBooking | null;
    links: BookingLinks | null;
    meta: BookingMeta | null;
    loading: boolean;
    createLoading: boolean;
    cancelLoading: boolean;
    error: string | null;
}

export interface BookingCarImage {
    id: number;
    url: string;
}