import { MdFavoriteBorder } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { BiBrightness } from "react-icons/bi";
import { IoFlash } from "react-icons/io5";
import type { CarsSliderItem } from "../../data/carSlider/CarsSliderData";

type Props = {
    item: CarsSliderItem;
};

export default function CarsSliderCard({ item }: Props) {
    return (
        <div className="w-full bg-white border border-[#E2E7FF] rounded-2xl overflow-hidden">

            {/* IMAGE */}
            <div className="w-full relative">

                <span className="absolute top-3 right-3 md:top-4 md:right-4
        w-8 h-8 md:w-9 md:h-9
        bg-[#FFFFFFCC] rounded-full flex justify-center items-center">
                    <MdFavoriteBorder className="text-lg md:text-xl" />
                </span>

                <img
                    className="w-full object-cover"
                    src={item.image}
                    alt="car image"
                />

                <span className="absolute bottom-3 left-3 md:bottom-4 md:left-4
        px-2 py-1
        bg-[#4648D4E5]
        rounded-lg
        text-[10px] md:text-xs
        text-white">
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
            text-xs sm:text-sm font-medium mt-1">
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

                    <span className="flex items-center gap-1 bg-[#EAEDFF]
          px-2 py-1 rounded-2xl
          text-xs sm:text-sm">
                        <BiBrightness className="text-sm" />
                        {item.transmission}
                    </span>

                    <span className="flex items-center gap-1 bg-[#EAEDFF]
          px-2 py-1 rounded-2xl
          text-xs sm:text-sm">
                        <IoFlash className="text-sm" />
                        {item.fuel}
                    </span>
                </div>
            </div>
        </div>
    );
}