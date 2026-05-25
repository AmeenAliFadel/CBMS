import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    CAR_TYPE_OPTIONS,
    type CarsFilters,
} from "../../app/features/cars/carsTypes";

import {
    DEFAULT_CAR_FILTERS,
    fetchCars,
    resetFilters,
    setFilters,
} from "../../app/features/cars/carsSlice";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
    carFiltersSchema,
    type CarFiltersFormValues,
} from "../../schemas/carFiltersSchema";

export default function FilterCard() {
    const dispatch = useAppDispatch();

    const currentFilters = useAppSelector(
        (state) => state.cars.filters
    );

    const {
        register,
        handleSubmit,
        reset,
        watch,
    } = useForm<CarFiltersFormValues>({
        resolver: zodResolver(carFiltersSchema),

        defaultValues: {
            carType: currentFilters.carType,
            model: currentFilters.model,
            maxPrice: currentFilters.maxPrice,
        },
    });

    const maxPriceValue = watch("maxPrice");

    const onSubmit = (values: CarFiltersFormValues) => {
        const nextFilters: CarsFilters = {
            carType: values.carType,
            model: values.model.trim(),
            maxPrice: values.maxPrice,
        };

        dispatch(setFilters(nextFilters));

        dispatch(fetchCars(nextFilters));
    };

    const handleReset = () => {
        const nextFilters: CarsFilters = {
            ...DEFAULT_CAR_FILTERS,
        };

        reset({
            carType: nextFilters.carType,
            model: nextFilters.model,
            maxPrice: nextFilters.maxPrice,
        });

        dispatch(resetFilters());

        dispatch(fetchCars(nextFilters));
    };

    return (
        <aside className="mx-auto mt-6 lg:mx-0 lg:mt-0 w-full lg:w-70 bg-white border rounded-[12px] border-[#E2E7FF] p-5 flex flex-col gap-6">

            {/* Header */}
            <div className="flex items-center justify-between">
                <h2 className="text-[18px] text-[#131B2E]">
                    Filters
                </h2>

                <button
                    type="button"
                    onClick={handleReset}
                    className="text-[16px] text-[#4648D4]"
                >
                    Reset
                </button>
            </div>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="flex flex-col gap-6"
            >

                {/* Price */}
                <div>
                    <div className="flex items-center justify-between mb-3">
                        <h3 className="text-[16px] font-medium text-[#131B2E]">
                            Price per day
                        </h3>

                        <span className="text-xs text-gray-500">
                            ${maxPriceValue}
                        </span>
                    </div>

                    <input
                        type="range"
                        min={150}
                        max={2500}
                        step={1}
                        className="w-full accent-indigo-500 cursor-pointer"
                        {...register("maxPrice", {
                            valueAsNumber: true,
                        })}
                    />

                    <div className="flex justify-between mt-2 text-xs text-gray-500">
                        <span>$150</span>
                        <span>$2,500+</span>
                    </div>
                </div>

                {/* Car Type */}
                <div>
                    <h3 className="text-[16px] font-medium text-[#131B2E] mb-3">
                        Car Type
                    </h3>

                    <div className="space-y-3">
                        {CAR_TYPE_OPTIONS.map((type) => (
                            <label
                                key={type.value}
                                className="flex items-center gap-3 text-[14px] text-[#464554] cursor-pointer"
                            >
                                <input
                                    type="radio"
                                    value={type.value}
                                    {...register("carType")}
                                    className="accent-[#4648D4]"
                                />

                                {type.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Model */}
                <div>
                    <h3 className="text-[16px] font-medium text-[#131B2E] mb-3">
                        Model
                    </h3>

                    <input
                        type="text"
                        placeholder="Example: X5"
                        className="w-full rounded-xl border border-[#E2E7FF] px-4 py-2 text-sm outline-none focus:border-[#4648D4]"
                        {...register("model")}
                    />
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full rounded-xl bg-[#4648D4] py-2.5 text-sm font-semibold text-white transition hover:opacity-90 active:scale-[0.99]"
                >
                    Apply Filters
                </button>
            </form>
        </aside>
    );
}