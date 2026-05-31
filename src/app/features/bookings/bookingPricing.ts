import { calculateTripDays } from "../../../utils/date";
import type {
    BookingPricingBreakdown,
    BookingSummaryPricing,
} from "./bookingTypes";

const DEFAULT_BOOKING_FEES = 45;

export function calculateReserveCardPricing(
    dailyRate: number,
    startDate: string,
    endDate: string
): BookingPricingBreakdown {
    const safeDailyRate = Number.isFinite(dailyRate) ? dailyRate : 0;
    const tripDays = calculateTripDays(startDate, endDate);

    const subtotal = Number((safeDailyRate * tripDays).toFixed(2));
    const airportDelivery = Number((safeDailyRate * 0.1).toFixed(2));
    const tripProtection = Number((safeDailyRate * 0.08).toFixed(2));
    const total = Number((subtotal + airportDelivery + tripProtection).toFixed(2));

    return {
        tripDays,
        subtotal,
        airportDelivery,
        tripProtection,
        total,
    };
}

export function calculateBookingSummaryPricing(
    dailyRate: number,
    tripDays: number,
    fees = DEFAULT_BOOKING_FEES
): BookingSummaryPricing {
    const safeDailyRate = Number.isFinite(dailyRate) ? dailyRate : 0;
    const safeTripDays = Number.isFinite(tripDays) && tripDays > 0 ? tripDays : 1;
    const safeFees = Number.isFinite(fees) ? fees : DEFAULT_BOOKING_FEES;

    const subtotal = Number((safeDailyRate * safeTripDays).toFixed(2));
    const total = Number((subtotal + safeFees).toFixed(2));

    return {
        tripDays: safeTripDays,
        subtotal,
        fees: safeFees,
        total,
    };
}