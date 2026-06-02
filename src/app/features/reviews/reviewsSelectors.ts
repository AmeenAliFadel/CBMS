import type { RootState } from "../../store";

export const selectReviews = (state: RootState) => state.reviews.items;
export const selectReviewsLoading = (state: RootState) => state.reviews.loading;
export const selectReviewsError = (state: RootState) => state.reviews.error;
export const selectReviewSubmitting = (state: RootState) => state.reviews.submitting;
export const selectReviewSubmitError = (state: RootState) => state.reviews.submitError;
export const selectReviewSubmitMessage = (state: RootState) => state.reviews.submitMessage;