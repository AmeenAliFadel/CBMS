import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import {
    cancelBooking as cancelBookingRequest,
    createBooking as createBookingRequest,
    getBookingById as getBookingByIdRequest,
    getBookings as getBookingsRequest,
} from "./bookingApi";
import { getBookingErrorMessage } from "./bookingError";
import type {
    Booking,
    BookingState,
    BookingsResponse,
    CreateBookingRequest,
    DraftBooking,
} from "./bookingTypes";

const initialState: BookingState = {
    items: [],
    selectedBooking: null,
    draftBooking: null,
    links: null,
    meta: null,
    loading: false,
    createLoading: false,
    cancelLoading: false,
    error: null,
};

function upsertBooking(items: Booking[], booking: Booking) {
    const index = items.findIndex((item) => item.id === booking.id);

    if (index === -1) {
        return [booking, ...items];
    }

    const nextItems = [...items];
    nextItems[index] = booking;
    return nextItems;
}

function markBookingAsCanceled(booking: Booking): Booking {
    return {
        ...booking,
        status: "canceled",
    };
}

export const fetchBookings = createAsyncThunk<
    BookingsResponse,
    number | undefined,
    { rejectValue: string }
>("bookings/fetchBookings", async (page = 1, thunkApi) => {
    try {
        return await getBookingsRequest(page);
    } catch (error) {
        return thunkApi.rejectWithValue(getBookingErrorMessage(error));
    }
});

export const fetchBookingById = createAsyncThunk<
    Booking,
    number,
    { rejectValue: string }
>("bookings/fetchBookingById", async (bookingId, thunkApi) => {
    try {
        const response = await getBookingByIdRequest(bookingId);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(getBookingErrorMessage(error));
    }
});

export const createBooking = createAsyncThunk<
    Booking,
    CreateBookingRequest,
    { rejectValue: string }
>("bookings/createBooking", async (payload, thunkApi) => {
    try {
        const response = await createBookingRequest(payload);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(getBookingErrorMessage(error));
    }
});

export const cancelBooking = createAsyncThunk<
    number,
    number,
    { rejectValue: string }
>("bookings/cancelBooking", async (bookingId, thunkApi) => {
    try {
        await cancelBookingRequest(bookingId);
        return bookingId;
    } catch (error) {
        return thunkApi.rejectWithValue(getBookingErrorMessage(error));
    }
});

const bookingSlice = createSlice({
    name: "bookings",
    initialState,
    reducers: {
        setDraftBooking(state, action: PayloadAction<DraftBooking>) {
            state.draftBooking = action.payload;
        },
        clearDraftBooking(state) {
            state.draftBooking = null;
        },
        resetBookingState(state) {
            Object.assign(state, initialState);
        },
        clearBookingError(state) {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchBookings.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookings.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.data;
                state.links = action.payload.links;
                state.meta = action.payload.meta;
            })
            .addCase(fetchBookings.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ?? "Failed to fetch bookings. Please try again.";
            })
            .addCase(fetchBookingById.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchBookingById.fulfilled, (state, action) => {
                state.loading = false;
                state.selectedBooking = action.payload;
                state.items = upsertBooking(state.items, action.payload);
            })
            .addCase(fetchBookingById.rejected, (state, action) => {
                state.loading = false;
                state.error =
                    action.payload ??
                    "Failed to fetch booking details. Please try again.";
            })
            .addCase(createBooking.pending, (state) => {
                state.createLoading = true;
                state.error = null;
            })
            .addCase(createBooking.fulfilled, (state, action) => {
                state.createLoading = false;
                state.selectedBooking = action.payload;
                state.items = upsertBooking(state.items, action.payload);
            })
            .addCase(createBooking.rejected, (state, action) => {
                state.createLoading = false;
                state.error =
                    action.payload ?? "Failed to create booking. Please try again.";
            })
            .addCase(cancelBooking.pending, (state) => {
                state.cancelLoading = true;
                state.error = null;
            })
            .addCase(cancelBooking.fulfilled, (state, action) => {
                state.cancelLoading = false;

                if (state.selectedBooking?.id === action.payload) {
                    state.selectedBooking = markBookingAsCanceled(state.selectedBooking);
                }

                state.items = state.items.map((item) =>
                    item.id === action.payload ? markBookingAsCanceled(item) : item
                );
            })
            .addCase(cancelBooking.rejected, (state, action) => {
                state.cancelLoading = false;
                state.error =
                    action.payload ?? "Failed to cancel booking. Please try again.";
            });
    },
});

export const {
    setDraftBooking,
    clearDraftBooking,
    resetBookingState,
    clearBookingError,
} = bookingSlice.actions;

export default bookingSlice.reducer;