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
        <div className="px-10 lg:px-25 py-6 lg:py-10">
            <div className="flex flex-col lg:flex-row gap-10 items-start">
                <div className="flex-1 flex flex-col gap-8">
                    <div>
                        <h1 className="text-3xl lg:text-[50px] font-extrabold text-gray-900 tracking-tight">
                            {car.title}
                        </h1>
                        <div className="flex items-center gap-3 mt-2">
                            <div className="flex items-center gap-1">
                                <img src={starr} alt="" />
                                <span className="text-[16px] font-semibold text-[#131B2E] ml-1">
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

                    <div>
                        <h2 className="text-lg lg:text-3xl font-bold text-[#131B2E] mb-2">
                            About this vehicle
                        </h2>
                        <p className="text-[16px] text-gray-600 leading-relaxed">
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
                        className="w-full lg:w-fit flex items-center justify-between gap-3 lg:gap-60 p-3 lg:p-5 bg-white border border-gray-200 rounded-2xl"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-20 h-10 lg:w-14 lg:h-14 rounded-full bg-indigo-100 flex items-center justify-center text-[#4648D4] font-bold">
                                {car.owner.name.charAt(0).toUpperCase()}
                            </div>
                            <div>
                                <p className="text-[10px] lg:text-xs text-[#4648D4]">Hosted by</p>
                                <p className="text-sm lg:text-lg font-bold text-[#131B2E]">
                                    {car.owner.name}
                                </p>
                                <p className="text-xs text-[#464554]">
                                    Listed {listedDate} · {statusLabel}
                                </p>
                            </div>
                        </div>
                        <button className="text-sm font-semibold bg-gray-100 hover:bg-gray-300 border border-gray-200 rounded-xl px-4 py-2">
                            Contact
                        </button>
                    </div>
                </div>

                <aside className="w-full lg:w-90 shrink-0">
                    <ReserveCard car={car} />
                </aside>
            </div>
        </div>
    );
}

export default ContentCarSection;