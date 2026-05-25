import { useEffect } from "react";

import FilterCard from "../../components/car/FilterCard";
import { CarCard } from "../../components/car/CarCard";
import CarCardSkeleton from "../../components/car/CarCardSkeleton";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  fetchCars,
  setPage,
} from "../../app/features/cars/carsSlice";

import { selectVisibleCars } from "../../app/features/cars/carsSelectors";

function CarShowSection() {
  const dispatch = useAppDispatch();

  const {
    loading,
    error,
    page,
    meta,
  } = useAppSelector((state) => state.cars);

  const cars = useAppSelector(selectVisibleCars);

  // =========================
  // FETCH CARS (Backend Pagination)
  // =========================
  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch, page]);

  // =========================
  // CHANGE PAGE
  // =========================
  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage));
  };

  return (
    <div className="px-10 md:px-6.25 lg:px-25 py-6">
      <div className="flex flex-col lg:flex-row gap-6">

        {/* Filter */}
        <div className="w-full lg:w-70 shrink-0">
          <FilterCard />
        </div>

        {/* Cars */}
        <div className="flex-1">

          {/* Error */}
          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Loading */}
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <CarCardSkeleton key={i} />
              ))}
            </div>
          ) : (
            <>
              {/* Cars Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {/* Pagination */}
              <div className="mt-10 flex items-center justify-center gap-2 flex-wrap">

                {/* Prev */}
                <button
                  disabled={page === 1}
                  onClick={() => handlePageChange(page - 1)}
                  className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium transition-all
               hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Prev
                </button>

                {/* Pages */}
                {Array.from({ length: meta?.last_page || 1 }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => handlePageChange(p)}
                    className={`
        w-10 h-10 rounded-xl text-sm font-semibold transition-all
        flex items-center justify-center
        ${p === page
                        ? "bg-primary text-white shadow-md scale-105"
                        : "bg-white border border-border text-text-primary hover:border-primary hover:text-primary"
                      }
      `}
                  >
                    {p}
                  </button>
                ))}

                {/* Next */}
                <button
                  disabled={page === meta?.last_page}
                  onClick={() => handlePageChange(page + 1)}
                  className="px-4 py-2 rounded-xl border border-border bg-white text-sm font-medium transition-all
                hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Next
                </button>

              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}

export default CarShowSection;