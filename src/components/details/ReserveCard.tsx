import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import type { Car } from "../../app/features/cars/carsTypes";
import { useAppDispatch } from "../../app/hooks";
import { setDraftBooking } from "../../app/features/bookings/bookingSlice";
import { calculateReserveCardPricing } from "../../app/features/bookings/bookingPricing";
import { formatCurrency } from "../../utils/currency";
import { formatInputDate } from "../../utils/date";

interface ReserveCardProps {
    car: Car;
}

export function ReserveCard({ car }: ReserveCardProps) {
    const dispatch = useAppDispatch();
    const today = useMemo(() => new Date(), []);
    const initialStartDate = useMemo(() => formatInputDate(today), [today]);
    const initialEndDate = useMemo(() => {
        const end = new Date(today);
        end.setDate(end.getDate() + 3);
        return formatInputDate(end);
    }, [today]);

    const [startDate, setStartDate] = useState(initialStartDate);
    const [endDate, setEndDate] = useState(initialEndDate);
    const [pickupLocation, setPickupLocation] = useState("Direct pickup");

    const pricePerDay = Number(car.price_per_day) || 0;
    const pricing = useMemo(
        () => calculateReserveCardPricing(pricePerDay, startDate, endDate),
        [pricePerDay, startDate, endDate]
    );

    const handleReserve = () => {
        dispatch(
            setDraftBooking({
                carId: car.id,
                startDate,
                endDate,
                pickupLocation,
            })
        );
    };

    return (
        <div
            data-aos="fade-up"
            className="sticky top-2 sm:top-6 bg-white rounded-2xl border border-gray-200 shadow-xl p-4 sm:p-6 w-full mx-auto sm:mx-0"
        >
            <div className="mb-4 sm:mb-5">
                <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {formatCurrency(pricePerDay)}
                </span>
                <span className="text-gray-500 text-sm font-medium">/day</span>
            </div>

            <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex flex-col border border-gray-200 rounded-xl px-3 py-2 focus-within:border-indigo-400 transition-colors">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                        Start
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        min={initialStartDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="text-sm sm:text-base text-gray-800 font-medium outline-none bg-transparent cursor-pointer"
                    />
                </div>
                <div className="flex flex-col border border-gray-200 rounded-xl px-3 py-2 focus-within:border-indigo-400 transition-colors">
                    <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                        End
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="text-sm sm:text-base text-gray-800 font-medium outline-none bg-transparent cursor-pointer"
                    />
                </div>
            </div>

            <div className="flex flex-col border border-gray-200 rounded-xl px-3 py-2 mb-5 focus-within:border-indigo-400 transition-colors">
                <label className="text-[10px] font-semibold text-gray-400 uppercase tracking-wide">
                    Pickup / Dropoff
                </label>

                <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="text-sm sm:text-base text-gray-800 font-medium outline-none bg-transparent cursor-pointer py-0.5"
                >
                    <option>Direct pickup</option>
                    <option>Home delivery</option>
                    <option>Downtown location</option>
                </select>
            </div>

            <div className="space-y-2 mb-5 border-t border-gray-100 pt-4">
                <div className="flex justify-between text-sm text-gray-600">
                    <span>
                        {formatCurrency(pricePerDay)} × {pricing.tripDays} days
                    </span>
                    <span className="font-medium text-gray-900">
                        {formatCurrency(pricing.subtotal)}
                    </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Airport Delivery</span>
                    <span className="font-medium text-gray-900">
                        {formatCurrency(pricing.airportDelivery)}
                    </span>
                </div>

                <div className="flex justify-between text-sm text-gray-600">
                    <span>Trip Protection</span>
                    <span className="font-medium text-gray-900">
                        {formatCurrency(pricing.tripProtection)}
                    </span>
                </div>

                <div className="flex justify-between font-bold text-base text-gray-900 border-t border-gray-100 pt-3 mt-2">
                    <span>Total</span>
                    <span>{formatCurrency(pricing.total)}</span>
                </div>
            </div>

            <Link
                to={`/booking/${car.id}`}
                onClick={handleReserve}
                className="w-full p-4 bg-linear-to-bl from-[#4648D4] to-[#9E00B5] hover:opacity-90 active:scale-95 text-white font-bold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl transition-all duration-200 shadow-md shadow-indigo-200 block text-center"
            >
                Reserve this car
            </Link>

            <p className="text-center text-xs text-gray-500 mt-3">
                You won't be charged yet
            </p>
        </div>
    );
}