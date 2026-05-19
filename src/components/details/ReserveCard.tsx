import { useState } from "react";
import type { BookingDetails } from "../../data/CarDetails/bookingg";



interface ReserveCardProps {
    booking: BookingDetails;
}

export function ReserveCard({ booking }: ReserveCardProps) {
    const [startDate, setStartDate] = useState(booking.startDate);
    const [endDate, setEndDate] = useState(booking.endDate);

    const subtotal = booking.pricePerDay * booking.tripDays;
    const total =
        subtotal + booking.airportDelivery + booking.tripProtection;

    return (
        <div data-aos="fade-up" className="sticky top-2 sm:top-6 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 sm:p-6 w-full  mx-auto sm:mx-0">

            {/* Price Header */}
            <div className="mb-4 sm:mb-5">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900"> ${booking.pricePerDay}</span>
                <span className="text-gray-500 text-sm font-medium">/day</span>
            </div>

            {/* Date Inputs */}
            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex flex-col border border-gray-200 rounded-xl px-3 py-2 focus-within:border-indigo-400 transition-colors">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide"> Start</label>
                    <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)}
                        className="text-sm sm:text-base text-gray-800 font-medium outline-none bg-transparent cursor-pointer" />
                </div>
                <div className="flex flex-col border border-gray-200 rounded-xl px-3 py-2 focus-within:border-indigo-400 transition-colors">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">End </label>
                    <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)}
                        className="text-sm sm:text-base text-gray-800 font-medium outline-none bg-transparent cursor-pointer" />
                </div>
            </div>

            {/* Pickup Location */}
            <div className="flex flex-col border border-gray-200 rounded-xl px-3 py-2 mb-5 focus-within:border-indigo-400 transition-colors">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide"> Pickup / Dropoff</label>

                <select className="text-sm sm:text-base text-gray-800 font-medium outline-none bg-transparent cursor-pointer py-0.5">
                    <option>{booking.pickupLocation}</option>
                    <option>Home Delivery</option>
                    <option>Downtown Location</option>
                </select>
            </div>

            {/* Price Breakdown */}
            <div className="space-y-2 mb-5 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span> ${booking.pricePerDay} × {booking.tripDays} days </span>
                    <span className="font-medium text-gray-900">${subtotal} </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Airport Delivery</span>
                    <span className="font-medium text-gray-900"> ${booking.airportDelivery}</span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Trip Protection</span>
                    <span className="font-medium text-gray-900"> ${booking.tripProtection}</span>
                </div>

                <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-100 pt-3 mt-2">
                    <span>Total</span>
                    <span>${total}</span>
                </div>
            </div>

            {/* CTA Button */}
            <button className="w-full bg-linear-to-bl from-[#4648D4] to-[#9E00B5] hover:opacity-90 active:scale-95 text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200">
                Reserve this car
            </button>

            <p className="text-center text-xs text-white mt-3">You won't be charged yet</p>
        </div>
    );
}
