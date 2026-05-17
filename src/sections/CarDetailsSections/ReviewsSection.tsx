
import { useState } from "react";
import ReviweCard  from "../../components/details/ReviweCard";
import { allReviews } from "../../data/CarDetails/CarReview";


export function ReviewsSection() {
    const [showAll, setShowAll] = useState(false);

    const visibleReviews = showAll ? allReviews : allReviews.slice(0, 2);
    
    return (
        <section className="flex flex-col gap-5  px-10 lg:px-25 py-6 lg:py-10">
            {/* Header */}
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xl font-extrabold text-gray-900">Reviews</h2>
                <button
                    onClick={() => setShowAll(!showAll)}
                    className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
                    {showAll ? "Show less" : "View all"}
                </button>
            </div>
            {/* Review cards grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
                {visibleReviews.map((review) => (
                    <ReviweCard key={review.id} review={review} />
                ))}
            </div>
        </section>
    );
};
