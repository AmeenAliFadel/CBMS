import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Car } from "../cars/carsTypes";

const selectCarDetailsState = (state: RootState) => state.carDetails;

export const selectCarDetailsItem = createSelector(
    [selectCarDetailsState],
    (state) => state.item
);

export const selectCarDetailsLoading = createSelector(
    [selectCarDetailsState],
    (state) => state.loading
);

export const selectCarDetailsError = createSelector(
    [selectCarDetailsState],
    (state) => state.error
);

function buildGallerySlots(car: Car | null): Array<string | null> {
    if (!car) {
        return [null, null, null, null, null];
    }

    const rawImages = [car.images.main, ...(car.images.gallery ?? [])].filter(
        (image): image is string => Boolean(image)
    );

    const uniqueImages = Array.from(new Set(rawImages));

    return Array.from({ length: 5 }, (_, index) => uniqueImages[index] ?? null);
}

export const selectCarDetailsGallerySlots = createSelector(
    [selectCarDetailsItem],
    (car) => buildGallerySlots(car)
);