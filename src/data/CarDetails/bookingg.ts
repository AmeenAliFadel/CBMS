
export interface BookingDetails {
    pricePerDay: number;
    startDate: string;
    endDate: string;
    pickupLocation: string;
    tripDays: number;
    airportDelivery: number;
    tripProtection: number;
}
export const bookingData: BookingDetails = {
    pricePerDay: 249,
    startDate: "2024-10-24",
    endDate: "2024-10-27",
    pickupLocation: "LAX Airport Delivery",
    tripDays: 3,
    airportDelivery: 120,
    tripProtection: 89.5,
};