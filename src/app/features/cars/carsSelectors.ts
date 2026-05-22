import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Car, CarsSortOption } from "./carsTypes";

const selectCarsItems = (state: RootState) => state.cars.items;
const selectSearchTerm = (state: RootState) => state.cars.searchTerm;
const selectSortBy = (state: RootState) => state.cars.sortBy;

function matchesSearch(car: Car, searchTerm: string) {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return true;

    return (
        car.title.toLowerCase().includes(query) ||
        car.brand.toLowerCase().includes(query) ||
        car.model.toLowerCase().includes(query) ||
        car.car_type.name.toLowerCase().includes(query) ||
        car.owner.name.toLowerCase().includes(query)
    );
}

function sortCars(items: Car[], sortBy: CarsSortOption) {
    const sorted = [...items];

    if (sortBy === "price_low_to_high") {
        return sorted.sort(
            (a, b) => Number(a.price_per_day) - Number(b.price_per_day)
        );
    }

    if (sortBy === "price_high_to_low") {
        return sorted.sort(
            (a, b) => Number(b.price_per_day) - Number(a.price_per_day)
        );
    }

    return sorted;
}

export const selectVisibleCars = createSelector(
    [selectCarsItems, selectSearchTerm, selectSortBy],
    (items, searchTerm, sortBy) => {
        const filtered = items.filter((car) => matchesSearch(car, searchTerm));
        return sortCars(filtered, sortBy);
    }
);