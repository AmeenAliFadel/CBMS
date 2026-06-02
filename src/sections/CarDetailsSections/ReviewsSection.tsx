import { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import ReviweCard from "../../components/details/ReviweCard";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
    clearReviewFeedback,
    createNewReview,
    fetchCarReviews,
    resetReviews,
} from "../../app/features/reviews/reviewsSlice";
import {
    selectReviewSubmitError,
    selectReviewSubmitMessage,
    selectReviewSubmitting,
    selectReviews,
    selectReviewsError,
    selectReviewsLoading,
} from "../../app/features/reviews/reviewsSelectors";
import { reviewSchema, type ReviewFormValues } from "../../schemas/reviewSchemas";

interface ReviewsSectionProps {
    carId: number;
}

function ReviewsSkeleton() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {Array.from({ length: 2 }).map((_, index) => (
                <div
                    key={index}
                    className="animate-pulse bg-white rounded-2xl border border-gray-100 shadow-sm p-4 sm:p-6 flex flex-col gap-4"
                >
                    <div className="flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-gray-200" />
                            <div className="space-y-2">
                                <div className="h-3 w-28 rounded bg-gray-200" />
                                <div className="h-2 w-20 rounded bg-gray-200" />
                            </div>
                        </div>
                        <div className="h-4 w-20 rounded bg-gray-200" />
                    </div>

                    <div className="space-y-2">
                        <div className="h-3 w-full rounded bg-gray-200" />
                        <div className="h-3 w-5/6 rounded bg-gray-200" />
                        <div className="h-3 w-4/6 rounded bg-gray-200" />
                    </div>
                </div>
            ))}
        </div>
    );
}

export function ReviewsSection({ carId }: ReviewsSectionProps) {
    const dispatch = useAppDispatch();
    const reviews = useAppSelector(selectReviews);
    const loading = useAppSelector(selectReviewsLoading);
    const error = useAppSelector(selectReviewsError);
    const submitting = useAppSelector(selectReviewSubmitting);
    const submitError = useAppSelector(selectReviewSubmitError);
    const submitMessage = useAppSelector(selectReviewSubmitMessage);

    const [showAll, setShowAll] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const {
        register,
        handleSubmit,
        setValue,
        watch,
        reset,
        formState: { errors },
    } = useForm<ReviewFormValues>({
        resolver: zodResolver(reviewSchema),
        defaultValues: {
            rating: 5,
            comment: "",
        },
    });

    const rating = watch("rating") ?? 5;
    const visibleReviews = showAll ? reviews : reviews.slice(0, 2);
    const canToggle = reviews.length > 2;

    useEffect(() => {
        if (!Number.isInteger(carId) || carId <= 0) {
            dispatch(resetReviews());
            return;
        }

        dispatch(resetReviews());
        dispatch(clearReviewFeedback());
        setShowAll(false);
        dispatch(fetchCarReviews(carId));
    }, [carId, dispatch]);

    const openModal = () => {
        dispatch(clearReviewFeedback());
        reset({
            rating: 5,
            comment: "",
        });
        setIsModalOpen(true);
    };

    const closeModal = () => {
        reset({
            rating: 5,
            comment: "",
        });
        setIsModalOpen(false);
    };

    const handleRatingChange = (nextRating: number) => {
        setValue("rating", nextRating, {
            shouldValidate: true,
            shouldDirty: true,
        });
    };

    const onSubmit = async (values: ReviewFormValues) => {
        if (!Number.isInteger(carId) || carId <= 0) return;

        const result = await dispatch(
            createNewReview({
                carId,
                payload: values,
            })
        );

        if (createNewReview.fulfilled.match(result)) {
            reset({
                rating: 5,
                comment: "",
            });
            setIsModalOpen(false);
        }
    };

    const retryLoadReviews = () => {
        if (!Number.isInteger(carId) || carId <= 0) return;
        dispatch(fetchCarReviews(carId));
    };

    const showFullErrorState = error && reviews.length === 0 && !loading;
    const showInlineError = error && reviews.length > 0;

    return (
        <section className="flex flex-col gap-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-6 lg:py-10">
            <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    Reviews
                </h2>

                <div className="flex items-center gap-3">
                    {canToggle && (
                        <button
                            onClick={() => setShowAll((prev) => !prev)}
                            className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                        >
                            {showAll ? "Show less" : "View all"}
                        </button>
                    )}

                    <button
                        onClick={openModal}
                        className="
                            shrink-0
                            rounded-full
                            bg-primary
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-white
                            shadow-sm
                            transition-colors
                            hover:opacity-90
                            disabled:cursor-not-allowed
                            disabled:opacity-60
                        "
                        disabled={!Number.isInteger(carId) || carId <= 0}
                    >
                        Add Review
                    </button>
                </div>
            </div>

            {submitMessage && !isModalOpen && (
                <div className="rounded-2xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                    {submitMessage}
                </div>
            )}

            {showInlineError && (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 flex items-center justify-between gap-3">
                    <span>{error}</span>
                    <button
                        onClick={retryLoadReviews}
                        className="shrink-0 font-semibold text-red-700 underline underline-offset-4"
                    >
                        Retry
                    </button>
                </div>
            )}

            {loading && reviews.length === 0 ? (
                <ReviewsSkeleton />
            ) : showFullErrorState ? (
                <div className="rounded-2xl border border-red-200 bg-red-50 px-5 py-8 text-center">
                    <h3 className="text-base font-bold text-red-700">
                        Failed to load reviews
                    </h3>
                    <p className="mt-2 text-sm text-red-600">
                        {error}
                    </p>
                    <button
                        onClick={retryLoadReviews}
                        className="
                            mt-5
                            rounded-full
                            bg-red-600
                            px-5
                            py-2.5
                            text-sm
                            font-semibold
                            text-white
                            transition-colors
                            hover:bg-red-700
                        "
                    >
                        Try again
                    </button>
                </div>
            ) : reviews.length === 0 ? (
                <div className="rounded-2xl border border-gray-100 bg-white px-5 py-8 text-center shadow-sm">
                    <h3 className="text-base font-bold text-gray-900">
                        No reviews yet
                    </h3>
                    <p className="mt-2 text-sm text-gray-500">
                        Be the first one to share your experience with this car.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {visibleReviews.map((review) => (
                        <ReviweCard key={review.id} review={review} />
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
                    <button
                        type="button"
                        aria-label="Close review modal"
                        className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"
                        onClick={closeModal}
                    />

                    <div className="relative z-10 w-full max-w-lg rounded-2xl bg-white p-5 sm:p-6 shadow-2xl border border-gray-100">
                        <div className="flex items-start justify-between gap-4">
                            <div>
                                <h3 className="text-lg font-extrabold text-gray-900">
                                    Add Review
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">
                                    Rate the car and leave a useful comment.
                                </p>
                            </div>

                            <button
                                type="button"
                                onClick={closeModal}
                                className="rounded-full p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
                                aria-label="Close modal"
                            >
                                <svg
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                    aria-hidden="true"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>

                        <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-5">
                            <div>
                                <label className="mb-2 block text-sm font-semibold text-gray-700">
                                    Rating
                                </label>

                                <div className="flex items-center gap-2">
                                    {Array.from({ length: 5 }).map((_, index) => {
                                        const starValue = index + 1;
                                        const isActive = starValue <= rating;

                                        return (
                                            <button
                                                key={starValue}
                                                type="button"
                                                disabled={submitting}
                                                onClick={() => handleRatingChange(starValue)}
                                                className={`rounded-full p-1 transition-colors ${isActive
                                                    ? "text-primary"
                                                    : "text-gray-300 hover:text-gray-400"
                                                    }`}
                                                aria-label={`Set rating to ${starValue}`}
                                            >
                                                <svg
                                                    className="h-7 w-7"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    aria-hidden="true"
                                                >
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                            </button>
                                        );
                                    })}
                                </div>

                                {errors.rating && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.rating.message}
                                    </p>
                                )}
                            </div>

                            <div>
                                <label
                                    htmlFor="review-comment"
                                    className="mb-2 block text-sm font-semibold text-gray-700"
                                >
                                    Comment
                                </label>

                                <textarea
                                    id="review-comment"
                                    {...register("comment")}
                                    disabled={submitting}
                                    rows={5}
                                    placeholder="Write your comment here..."
                                    className="
                                        w-full
                                        rounded-2xl
                                        border
                                        border-gray-200
                                        bg-white
                                        px-4
                                        py-3
                                        text-sm
                                        text-gray-900
                                        outline-none
                                        transition-colors
                                        placeholder:text-gray-400
                                        focus:border-indigo-400
                                        focus:ring-2
                                        focus:ring-indigo-100
                                        disabled:cursor-not-allowed
                                        disabled:bg-gray-50
                                    "
                                />

                                {errors.comment && (
                                    <p className="mt-2 text-sm text-red-600">
                                        {errors.comment.message}
                                    </p>
                                )}
                            </div>

                            {submitError && (
                                <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                                    {submitError}
                                </div>
                            )}

                            <div className="flex items-center justify-end gap-3 pt-1">
                                <button
                                    type="button"
                                    onClick={closeModal}
                                    disabled={submitting}
                                    className="
                                        rounded-full
                                        border
                                        border-gray-200
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-gray-700
                                        transition-colors
                                        hover:bg-gray-50
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={submitting}
                                    className="
                                        rounded-full
                                        bg-primary
                                        px-5
                                        py-2.5
                                        text-sm
                                        font-semibold
                                        text-white
                                        shadow-sm
                                        transition-colors
                                        hover:opacity-90
                                        disabled:cursor-not-allowed
                                        disabled:opacity-60
                                    "
                                >
                                    {submitting ? "Submitting..." : "Submit review"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}

export default ReviewsSection;