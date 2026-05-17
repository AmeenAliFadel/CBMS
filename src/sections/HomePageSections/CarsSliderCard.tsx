import { FaStar, FaHeart } from "react-icons/fa";
import { BiBrightness } from "react-icons/bi";
import { IoFlash } from "react-icons/io5";
import { CiHeart } from "react-icons/ci";

import type { CarsSliderItem } from "../../data/carSlider/CarsSliderData";
import { useState } from "react";

type Props = {
    item: CarsSliderItem;
    onFavoriteToggle?: (id: number, isFav: boolean) => void;
};

export default function CarsSliderCard({
    item,
    onFavoriteToggle,
}: Props) {

    const [fav, setFav] = useState(item.favorite ?? false);

    const handleFavorite = () => {
        const nextValue = !fav;

        setFav(nextValue);

        onFavoriteToggle?.(item.id, nextValue);
    };

    return (
        <div className="w-full bg-white border border-[#E2E7FF] rounded-2xl overflow-hidden">

            {/* IMAGE */}
            <div className="w-full relative">

                <button
                    onClick={handleFavorite}
                    className={`
                        absolute top-3 right-3 z-10
                        w-9 h-9
                        flex items-center justify-center
                        rounded-full
                        transition-all duration-300
                        ${fav ? "bg-gray-200" : "bg-white"}
                    `}
                >
                    {fav ? (
                        <FaHeart className="text-blue-600 text-lg" />
                    ) : (
                        <CiHeart className="text-gray-400 text-xl" />
                    )}
                </button>

                <img
                    className="w-full object-cover"
                    src={item.image}
                    alt="car image"
                />

                <span
                    className="
                        absolute bottom-3 left-3 md:bottom-4 md:left-4
                        px-2 py-1
                        bg-[#4648D4E5]
                        rounded-lg
                        text-[10px] md:text-xs
                        text-white
                    "
                >
                    {item.badge}
                </span>
            </div>

            {/* CONTENT */}
            <div className="p-4 md:p-6">

                <div className="flex justify-between items-start gap-4">

                    {/* LEFT */}
                    <div>
                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#131B2E]">
                            {item.title}
                        </h3>

                        <span className="flex items-center gap-1 text-[#464554]
                            text-xs sm:text-sm font-medium mt-1"
                        >
                            <FaStar className="text-[#00687A] text-xs" />

                            {item.rating} ({item.trips} trips)
                        </span>
                    </div>

                    {/* RIGHT */}
                    <div className="text-right shrink-0">

                        <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#4648D4]">
                            {item.price}
                        </h3>

                        <span className="text-[#464554] text-[10px] sm:text-xs font-medium">
                            per day
                        </span>
                    </div>
                </div>

                {/* TAGS */}
                <div className="flex flex-wrap items-center gap-2 pt-4">

                    <span
                        className="
                            flex items-center gap-1
                            bg-[#EAEDFF]
                            px-2 py-1
                            rounded-2xl
                            text-xs sm:text-sm
                        "
                    >
                        <BiBrightness className="text-sm" />
                        {item.transmission}
                    </span>

                    <span
                        className="
                            flex items-center gap-1
                            bg-[#EAEDFF]
                            px-2 py-1
                            rounded-2xl
                            text-xs sm:text-sm
                        "
                    >
                        <IoFlash className="text-sm" />
                        {item.fuel}
                    </span>
                </div>
            </div>
        </div>
    );
}