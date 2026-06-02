import { useMemo, useState } from "react";
import type { Car } from "../../app/features/cars/carsTypes";
import SpecsCard from "../../components/details/SpecsCard";
import { ReserveCard } from "../../components/details/ReserveCard";
import starr from "../../assets/DetailsImgs/starr.svg";
import Seats from "../../assets/DetailsImgs/Seats.svg";
import mph from "../../assets/DetailsImgs/mph.svg";
import speed from "../../assets/DetailsImgs/speed.svg";
import Transmission from "../../assets/DetailsImgs/Transmission.svg";

interface ContentCarSectionProps {
    car: Car;
}

interface CarSpec {
    icon: string;
    value: string;
    label: string;
}

function formatListedDate(value: string | null | undefined) {
    if (!value) return "Recently listed";

    const parsed = new Date(value.replace(" ", "T"));

    if (Number.isNaN(parsed.getTime())) {
        return "Recently listed";
    }

    return new Intl.DateTimeFormat("en-US", {
        month: "long",
        year: "numeric",
    }).format(parsed);
}

function ContentCarSection({ car }: ContentCarSectionProps) {
    const [expanded, setExpanded] = useState(false);

    const description = car.description?.trim() || "No description available for this vehicle.";
    const shortDescription =
        description.length > 180 ? `${description.slice(0, 180)}...` : description;

    const specs: CarSpec[] = useMemo(
        () => [
            { icon: speed, value: String(car.year), label: "Year" },
            { icon: mph, value: `$${car.price_per_day}`, label: "Price / day" },
            { icon: Transmission, value: car.car_type.name, label: "Type" },
            { icon: Seats, value: car.owner.name, label: "Owner" },
        ],
        [car]
    );

    const listedDate = formatListedDate(car.created_at);
    const statusLabel = car.status ? car.status.replaceAll("_", " ") : "unknown";

    return (
        <div className="w-full py-4 sm:py-6 lg:py-8">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 lg:flex-row lg:items-start lg:gap-8">
                <div className="flex min-w-0 flex-1 flex-col gap-6 sm:gap-8">
                    <div className="min-w-0">
                        <h1 className="wrap-break-word text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl lg:text-[50px]">
                            {car.title}
                        </h1>

                        <div className="mt-2 flex flex-wrap items-center gap-2 sm:gap-3">
                            <div className="flex items-center gap-1">
                                <img src={starr} alt="" className="shrink-0" />
                                <span className="ml-1 text-[16px] font-semibold text-[#131B2E]">
                                    {car.car_type.name}
                                </span>
                            </div>
                            <span className="text-gray-300">·</span>
                            <span className="text-[16px] text-[#464554]">
                                {car.brand} {car.model}
                            </span>
                        </div>
                    </div>

                    <SpecsCard specs={specs} />

                    <div className="min-w-0">
                        <h2 className="mb-2 text-lg font-bold text-[#131B2E] sm:text-xl lg:text-3xl">
                            About this vehicle
                        </h2>

                        <p className="w-full max-w-none wrap-break-word text-[16px] leading-relaxed text-gray-600 lg:max-w-xl">
                            {expanded ? description : shortDescription}
                        </p>

                        {description.length > 180 && (
                            <button
                                onClick={() => setExpanded(!expanded)}
                                className="mt-4 text-sm font-semibold text-[#4648D4]"
                            >
                                {expanded ? "Show less ↑" : "Read more ↓"}
                            </button>
                        )}
                    </div>

                    <div
                        data-aos="fade-up"
                        className="flex w-full flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 sm:p-5"
                    >
                        <div className="flex min-w-0 items-center gap-3">
                            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-indigo-100 font-bold text-[#4648D4] sm:h-14 sm:w-14">
                                {car.owner.name.charAt(0).toUpperCase()}
                            </div>

                            <div className="min-w-0">
                                <p className="text-[10px] text-[#4648D4] sm:text-xs">Hosted by</p>
                                <p className="wrap-break-word text-sm font-bold text-[#131B2E] sm:text-base lg:text-lg">
                                    {car.owner.name}
                                </p>
                                <p className="wrap-break-word text-xs text-[#464554]">
                                    Listed {listedDate} · {statusLabel}
                                </p>
                            </div>
                        </div>

                        <button className="inline-flex w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100 px-4 py-2 text-sm font-semibold hover:bg-gray-300 sm:w-auto">
                            Contact
                        </button>
                    </div>
                </div>

                <aside className="w-full shrink-0 lg:w-90">
                    <ReserveCard car={car} />
                </aside>
            </div>
        </div>
    );
}

export default ContentCarSection;