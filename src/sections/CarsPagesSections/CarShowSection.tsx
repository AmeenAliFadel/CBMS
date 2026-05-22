import { useEffect } from "react";
import FilterCard from "../../components/car/FilterCard";
import { CarCard } from "../../components/car/CarCard";
import CarCardSkeleton from "../../components/car/CarCardSkeleton";
import { fetchCars } from "../../app/features/cars/carsSlice";
import { selectVisibleCars } from "../../app/features/cars/carsSelectors";
import { useAppDispatch, useAppSelector } from "../../app/hooks";

function CarShowSection() {
  const dispatch = useAppDispatch();

  const visibleCars = useAppSelector(selectVisibleCars);
  const { loading, error, meta } = useAppSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  return (
    <div className="px-10 md:px-6.25 lg:px-25 py-6">
      <div className="flex flex-col lg:flex-row gap-6">
        <div data-aos="fade-up" className="w-full lg:w-70 shrink-0">
          <FilterCard />
        </div>

        <div className="flex-1">
          {meta && !loading && (
            <div className="mb-4 text-sm text-text-secondary">
              Showing {visibleCars.length} of {meta.total} cars
            </div>
          )}

          {error && (
            <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, index) => (
                <CarCardSkeleton key={index} />
              ))}
            </div>
          ) : visibleCars.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {visibleCars.map((car) => (
                <CarCard key={car.id} car={car} />
              ))}
            </div>
          ) : (
            <div className="rounded-2xl border border-dashed border-gray-300 bg-white p-10 text-center text-sm text-gray-500">
              No cars found for the selected search or filters.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CarShowSection;