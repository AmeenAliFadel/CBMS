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
        <div className="w-full bg-white border border-[#E2E7FF] rounded-2xl">
            <div className="w-full relative">
                <span className="w-9 h-9 bg-[#FFFFFFCC] absolute top-4 right-4 rounded-full flex justify-center items-center">
                    <MdFavoriteBorder className="text-xl" />
                </span>

                <img className="w-full rounded-t-2xl" src={item.image} alt="car image" />

                <span className="px-2 py-[5.5px] bg-[#4648D4E5] rounded-lg text-white text-xs absolute bottom-2.75 left-4">
                    {item.badge}
                </span>
            </div>

            <div className="p-6">
                <div className="flex justify-between items-center gap-5">
                    <div>
                        <h3 className="text-2xl font-semibold text-[#131B2E]">{item.title}</h3>
                        <span className="flex items-center gap-px text-[#464554] text-sm font-semibold">
                            <FaStar className="text-[#00687A]" /> {item.rating} ({item.trips} trips)
                        </span>
                    </div>

                    <div>
                        <h3 className="text-[#4648D4] text-2xl font-semibold">{item.price}</h3>
                        <span className="text-[#464554] text-xs font-medium pl-2.5">per day</span>
                    </div>
                </div>

                <div className="flex justify-start items-center gap-2 pt-4">
                    <span className="flex items-center gap-1 bg-[#EAEDFF] px-2 py-1 rounded-2xl w-max">
                        <BiBrightness />
                        {item.transmission}
                    </span>
                    <span className="flex items-center gap-1 bg-[#EAEDFF] px-2 py-1 rounded-2xl w-max">
                        <IoFlash />
                        {item.fuel}
                    </span>
                </div>
            </div>
        </div>
    );
}