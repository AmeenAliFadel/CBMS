import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import CarsSliderCard from "./CarsSliderCard";
import { carsSliderData } from "../../data/carSlider/CarsSliderData";

import "swiper/css";
import "swiper/css/navigation";

export default function CarsSlider() {
    const prevRef = useRef<HTMLButtonElement | null>(null);
    const nextRef = useRef<HTMLButtonElement | null>(null);

    return (
        <div className="px-10">
            <div className="flex justify-between items-center pb-10">
                <div>
                    <h2 className="text-[#131B2E] text-[32px] font-bold">Curated Collections</h2>
                    <p className="text-[#464554] text-bace font-normal">
                        Hand-picked vehicles for your next adventure.
                    </p>
                </div>

                <div className="flex justify-between items-center gap-2">
                    <button
                        ref={prevRef}
                        className="w-10 h-10 flex justify-center items-center border border-[#C7C4D7] rounded-full"
                    >
                        <MdKeyboardArrowLeft />
                    </button>

                    <button
                        ref={nextRef}
                        className="w-10 h-10 flex justify-center items-center border border-[#C7C4D7] rounded-full"
                    >
                        <MdKeyboardArrowRight />
                    </button>
                </div>
            </div>

            <Swiper
                modules={[Navigation]}
                spaceBetween={40}
                slidesPerView={1}
                onBeforeInit={(swiper) => {
                    const navigation = swiper.params.navigation;

                    if (navigation && typeof navigation !== "boolean") {
                        navigation.prevEl = prevRef.current;
                        navigation.nextEl = nextRef.current;
                    }
                }}
                navigation={{
                    prevEl: prevRef.current,
                    nextEl: nextRef.current,
                }}
                breakpoints={{
                    390: {
                        slidesPerView: 1,
                        spaceBetween: 16,
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 24,
                    },
                    1440: {
                        slidesPerView: 3,
                        spaceBetween: 40,
                    },
                }}
            >
                {carsSliderData.map((item) => (
                    <SwiperSlide key={item.id}>
                        <CarsSliderCard item={item} />
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}