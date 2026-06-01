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
            className="sticky top-4 mx-auto w-full rounded-2xl border border-gray-200 bg-white p-4 shadow-xl sm:p-6 xl:mx-0"
        >
            <div className="mb-4 flex items-end gap-1 sm:mb-5">
                <span className="text-2xl font-extrabold text-gray-900 sm:text-3xl">
                    {formatCurrency(pricePerDay)}
                </span>
                <span className="pb-1 text-sm font-medium text-gray-500">/day</span>
            </div>

            <div className="mb-3 grid grid-cols-1 gap-2 sm:grid-cols-2">
                <div className="flex flex-col rounded-xl border border-gray-200 px-3 py-2 transition-colors focus-within:border-indigo-400">
                    <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        Start
                    </label>
                    <input
                        type="date"
                        value={startDate}
                        min={initialStartDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="cursor-pointer bg-transparent text-sm font-medium text-gray-800 outline-none sm:text-base"
                    />
                </div>

                <div className="flex flex-col rounded-xl border border-gray-200 px-3 py-2 transition-colors focus-within:border-indigo-400">
                    <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                        End
                    </label>
                    <input
                        type="date"
                        value={endDate}
                        min={startDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        className="cursor-pointer bg-transparent text-sm font-medium text-gray-800 outline-none sm:text-base"
                    />
                </div>
            </div>

            <div className="mb-5 flex flex-col rounded-xl border border-gray-200 px-3 py-2 transition-colors focus-within:border-indigo-400">
                <label className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                    Pickup / Dropoff
                </label>

                <select
                    value={pickupLocation}
                    onChange={(e) => setPickupLocation(e.target.value)}
                    className="cursor-pointer bg-transparent py-0.5 text-sm font-medium text-gray-800 outline-none sm:text-base"
                >
                    <option>Direct pickup</option>
                    <option>Home delivery</option>
                    <option>Downtown location</option>
                </select>
            </div>

            <div className="mb-5 space-y-2 border-t border-gray-100 pt-4">
                <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
                    <span className="min-w-0 wrap-break-word">
                        {formatCurrency(pricePerDay)} × {pricing.tripDays} days
                    </span>
                    <span className="shrink-0 font-medium text-gray-900">
                        {formatCurrency(pricing.subtotal)}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
                    <span className="min-w-0 wrap-break-word">Airport Delivery</span>
                    <span className="shrink-0 font-medium text-gray-900">
                        {formatCurrency(pricing.airportDelivery)}
                    </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-sm text-gray-600">
                    <span className="min-w-0 wrap-break-word">Trip Protection</span>
                    <span className="shrink-0 font-medium text-gray-900">
                        {formatCurrency(pricing.tripProtection)}
                    </span>
                </div>

                <div className="mt-2 flex items-center justify-between gap-3 border-t border-gray-100 pt-3 font-bold text-base text-gray-900">
                    <span>Total</span>
                    <span className="shrink-0">{formatCurrency(pricing.total)}</span>
                </div>
            </div>

            <Link
                to={`/booking/${car.id}`}
                onClick={handleReserve}
                className="block w-full rounded-xl bg-linear-to-bl from-[#4648D4] to-[#9E00B5] px-4 py-3.5 text-center text-sm font-bold text-white shadow-md shadow-indigo-200 transition-all duration-200 hover:opacity-90 active:scale-95 sm:text-base"
            >
                Reserve this car
            </Link>

            <p className="mt-3 text-center text-xs text-gray-500">
                You won't be charged yet
            </p>
        </div>
    );
}