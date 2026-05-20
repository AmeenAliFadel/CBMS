import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { CarCard } from "../../components/car/CarCard";
import { cars } from "../../data/carShow/CarShow";

import "swiper/css";
import "swiper/css/navigation";

export default function CarsSlider() {
  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  return (
    <section className="px-4 md:px-10 py-16">
      {/* Header */}
      <div className="flex items-center justify-between pb-10">
        <div>
          <h2 className="text-[#131B2E] text-3xl font-bold">
            Curated Collections
          </h2>

          <p className="text-[#464554] text-base mt-2">
            Hand-picked vehicles for your next adventure.
          </p>
        </div>

        {/* Navigation */}
        <div className="flex items-center gap-3">
          <button
            ref={prevRef}
            className="w-10 h-10 flex items-center justify-center border border-border rounded-full"
          >
            <MdKeyboardArrowLeft size={22} />
          </button>

          <button
            ref={nextRef}
            className="w-10 h-10 flex items-center justify-center border border-[#C7C4D7] rounded-full"
          >
            <MdKeyboardArrowRight size={22} />
          </button>
        </div>
      </div>

      {/* Slider */}
      <Swiper
        modules={[Navigation]}
        spaceBetween={24}
        slidesPerView={1}
        onBeforeInit={(swiper) => {
          if (
            swiper.params.navigation &&
            typeof swiper.params.navigation !== "boolean"
          ) {
            swiper.params.navigation.prevEl = prevRef.current;
            swiper.params.navigation.nextEl = nextRef.current;
          }
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
        }}
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 16,
          },

          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },

          1024: {
            slidesPerView: 3,
            spaceBetween: 24,
          },
        }}
      >
        {cars.map((car) => (
          <SwiperSlide key={car.id}>
            <CarCard car={car} />
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}