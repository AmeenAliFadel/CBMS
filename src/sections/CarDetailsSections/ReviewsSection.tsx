import { useState } from "react";
import ReviweCard from "../../components/details/ReviweCard";
import { allReviews } from "../../data/CarDetails/CarReview";

export function ReviewsSection() {
    const [showAll, setShowAll] = useState(false);

    const visibleReviews = showAll
        ? allReviews
        : allReviews.slice(0, 2);

    return (
        <section className="flex flex-col gap-5 px-4 sm:px-6 md:px-8 lg:px-16 xl:px-24 py-6 lg:py-10">

            <div className="flex items-center justify-between gap-4">
                <h2 className="text-lg sm:text-xl font-extrabold text-gray-900">
                    Reviews
                </h2>

                <button
                    onClick={() => setShowAll(!showAll)}
                    className="shrink-0 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                >
                    {showAll ? "Show less" : "View all"}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visibleReviews.map((review) => (
                    <ReviweCard
                        key={review.id}
                        review={review}
                    />
                ))}
            </div>

        </section>
    );
}