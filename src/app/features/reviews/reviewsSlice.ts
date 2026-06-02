import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createCarReview, getCarReviews } from "./reviewsApi";
import { parseReviewsError } from "./reviewsError";
import type {
    CreateReviewRequest,
    CreateReviewResponse,
    ReviewsResponse,
    ReviewsState,
} from "./reviewsTypes";

const initialState: ReviewsState = {
    items: [],
    loading: false,
    error: null,
    submitting: false,
    submitError: null,
    submitMessage: null,
};

export const fetchCarReviews = createAsyncThunk<
    ReviewsResponse,
    number,
    { rejectValue: string }
>("reviews/fetchCarReviews", async (carId, thunkApi) => {
    try {
        return await getCarReviews(carId);
    } catch (error) {
        return thunkApi.rejectWithValue(parseReviewsError(error));
    }
});

export const createNewReview = createAsyncThunk<
    CreateReviewResponse,
    { carId: number; payload: CreateReviewRequest },
    { rejectValue: string }
>("reviews/createNewReview", async ({ carId, payload }, thunkApi) => {
    try {
        return await createCarReview(carId, payload);
    } catch (error) {
        return thunkApi.rejectWithValue(parseReviewsError(error));
    }
});

const reviewsSlice = createSlice({
    name: "reviews",
    initialState,
    reducers: {
        resetReviews: () => initialState,
        clearReviewFeedback: (state) => {
            state.error = null;
            state.submitError = null;
            state.submitMessage = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarReviews.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCarReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.items = action.payload.reviews;
            })
            .addCase(fetchCarReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load reviews.";
            })
            .addCase(createNewReview.pending, (state) => {
                state.submitting = true;
                state.submitError = null;
                state.submitMessage = null;
            })
            .addCase(createNewReview.fulfilled, (state, action) => {
                state.submitting = false;
                state.submitMessage = action.payload.message;
            })
            .addCase(createNewReview.rejected, (state, action) => {
                state.submitting = false;
                state.submitError = action.payload ?? "Failed to submit review.";
            });
    },
});

export const { resetReviews, clearReviewFeedback } = reviewsSlice.actions;
export default reviewsSlice.reducer;