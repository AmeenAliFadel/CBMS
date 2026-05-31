import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { Car } from "../cars/carsTypes";
import { resolveImageUrl } from "../../../utils/resolveImageUrl";

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

export const selectCarDetailsMainImage = createSelector(
    [selectCarDetailsItem],
    (car) => resolveImageUrl(car?.images.main)
);

export const selectCarDetailsTitle = createSelector(
    [selectCarDetailsItem],
    (car) => (car ? `${car.brand} ${car.model}` : "")
);

export const selectCarDetailsSubtitle = createSelector(
    [selectCarDetailsItem],
    (car) => {
        if (!car) {
            return "";
        }

        return `${car.car_type.name} • ${car.year}`;
    }
);

function buildGallerySlots(car: Car | null): Array<string | null> {
    if (!car) {
        return [null, null, null, null, null];
    }

    const rawImages = [car.images.main, ...(car.images.gallery ?? [])].filter(
        (image): image is string => Boolean(image)
    );

    const uniqueImages = Array.from(new Set(rawImages)).map((image) =>
        resolveImageUrl(image)
    );

    return Array.from({ length: 5 }, (_, index) => uniqueImages[index] ?? null);
}

export const selectCarDetailsGallerySlots = createSelector(
    [selectCarDetailsItem],
    (car) => buildGallerySlots(car)
);