import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    resetSearchAndSort,
    setSearchTerm,
    setSortBy,
} from "../../app/features/cars/carsSlice";
import { selectVisibleCars } from "../../app/features/cars/carsSelectors";
import type { CarsSortOption } from "../../app/features/cars/carsTypes";
import { IoIosSearch } from "react-icons/io";

function SearchSection() {
    const dispatch = useAppDispatch();

    const visibleCars = useAppSelector(selectVisibleCars);
    const searchTerm = useAppSelector((state) => state.cars.searchTerm);
    const sortBy = useAppSelector((state) => state.cars.sortBy);

    const handleReset = () => {
        dispatch(resetSearchAndSort());
    };

    return (
        <div className="px-10 lg:px-25 py-6 lg:py-10">
            <h2 className="mb-4 lg:mb-6 text-xl md:text-3xl lg:text-[40px] font-sans font-extrabold">
                Find Your Perfect Drive
            </h2>

            <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-4 lg:gap-0">
                <div className="flex flex-col gap-3 w-full lg:w-143">
                    <div className="flex gap-3 items-center px-4 py-3 lg:py-4.5 w-full border border-border-search rounded-xl focus-within:border-black focus-within:border-2">
                        <IoIosSearch className="text-xl lg:text-2xl" />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => dispatch(setSearchTerm(e.target.value))}
                            placeholder="Search by title, brand, model, or type..."
                            className="text-xs lg:text-xl w-full outline-0 border-0 bg-transparent"
                        />
                    </div>

                    <button
                        type="button"
                        onClick={handleReset}
                        className="self-start text-sm font-semibold text-[#4648D4]"
                    >
                        Reset Search
                    </button>
                </div>

                <div className="flex lg:items-center justify-between gap-3 lg:gap-6">
                    <p className="text-sm lg:text-base">
                        Showing {visibleCars.length} Cars
                    </p>

                    <div className="w-0.5 h-10 lg:h-4 bg-border-search" />

                    <div className="flex flex-col lg:flex-row lg:items-start whitespace-nowrap">
                        <p className="font-bold text-[#4648D4] text-sm lg:text-base">
                            Sort By :
                        </p>

                        <select
                            value={sortBy}
                            onChange={(e) =>
                                dispatch(setSortBy(e.target.value as CarsSortOption))
                            }
                            className="border-0 outline-0 font-bold text-[#4648D4] text-sm md:text-base bg-transparent"
                        >
                            <option value="featured">Featured</option>
                            <option value="price_low_to_high">Price: Low to High</option>
                            <option value="price_high_to_low">Price: High to Low</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchSection;