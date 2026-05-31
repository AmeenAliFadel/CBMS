import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import { calculateTripDays } from "../../../utils/date";
import type { DraftBooking } from "./bookingTypes";

const selectBookingsState = (state: RootState) => state.bookings;

export const selectBookingItems = createSelector(
    [selectBookingsState],
    (state) => state.items
);

export const selectBookingSelected = createSelector(
    [selectBookingsState],
    (state) => state.selectedBooking
);

export const selectBookingDraft = createSelector(
    [selectBookingsState],
    (state) => state.draftBooking
);

export const selectBookingLinks = createSelector(
    [selectBookingsState],
    (state) => state.links
);

export const selectBookingMeta = createSelector(
    [selectBookingsState],
    (state) => state.meta
);

export const selectBookingLoading = createSelector(
    [selectBookingsState],
    (state) => state.loading
);

export const selectBookingCreateLoading = createSelector(
    [selectBookingsState],
    (state) => state.createLoading
);

export const selectBookingCancelLoading = createSelector(
    [selectBookingsState],
    (state) => state.cancelLoading
);

export const selectBookingError = createSelector(
    [selectBookingsState],
    (state) => state.error
);

export const selectBookingHasDraft = createSelector(
    [selectBookingDraft],
    (draft) => Boolean(draft)
);

export const selectBookingDraftCarId = createSelector(
    [selectBookingDraft],
    (draft) => draft?.carId ?? null
);

export const selectBookingDraftPickupLocation = createSelector(
    [selectBookingDraft],
    (draft) => draft?.pickupLocation ?? ""
);

function getTripDays(draft: DraftBooking | null) {
    if (!draft) {
        return 1;
    }

    return calculateTripDays(draft.startDate, draft.endDate);
}

export const selectBookingDraftTripDays = createSelector(
    [selectBookingDraft],
    (draft) => getTripDays(draft)
);