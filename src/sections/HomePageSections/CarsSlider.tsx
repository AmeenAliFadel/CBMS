import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";

import { CarCard } from "../../components/car/CarCard";

import { getFeaturedCars } from "../../app/features/cars/carsApi";

import type { Car } from "../../app/features/cars/carsTypes";

import "swiper/css";
import "swiper/css/navigation";

export default function CarsSlider() {

  const prevRef = useRef<HTMLButtonElement>(null);
  const nextRef = useRef<HTMLButtonElement>(null);

  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    async function fetchFeaturedCars() {
      try {

        const data = await getFeaturedCars();

        setCars(data);

      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedCars();

  }, []);

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
            className="w-10 h-10 flex items-center justify-center border border-border rounded-full transition-all hover:border-primary hover:text-primary"
          >
            <MdKeyboardArrowLeft size={22} />
          </button>

          <button
            ref={nextRef}
            className="w-10 h-10 flex items-center justify-center border border-border-search rounded-full transition-all hover:border-primary hover:text-primary"
          >
            <MdKeyboardArrowRight size={22} />
          </button>

        </div>

      </div>

      {loading ? (

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {Array.from({ length: 3 }).map((_, index) => (
            <div
              key={index}
              className="h-105 rounded-2xl bg-gray-100 animate-pulse"
            />
          ))}

        </div>

      ) : (

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
            <SwiperSlide key={car.id} className="h-auto!">

              <div className="h-full flex">
                <CarCard car={car} />
              </div>

            </SwiperSlide>
          ))}

        </Swiper>

      )}

    </section>
  );
}