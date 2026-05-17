
import type { Review } from "../../data/CarDetails/CarReview"

interface ReviewCardProps {
    review: Review;
}

function StarRating({ rating }: { rating: number }) {
    return (
        <div className="flex gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
                <svg key={i}
                    className={`w-5 h-5 ${i < rating ? "text-[#00687A]" : "text-gray-200"}`}
                    fill="currentColor"
                    viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
            ))}
        </div>
    );
}

export function ReviweCard({ review }: ReviewCardProps) {
    return (
        <div className=" bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-indigo-100 transition-all duration-200 p-7.5 flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
                <div className="flex items-center  gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold text-sm overflow-hidden shrink-0">
                        {review.avatar ? (<img src={review.avatar} alt={review.name} className="w-[80%] h-full object-cover" />)
                            : (review.name.charAt(0))}
                    </div>
                    <div className="flex flex-col ">
                        <span className="text-sm font-semibold text-gray-900">{review.name}</span>
                        {review.date && (
                            <span className="text-xs text-gray-400">{review.date}</span>
                        )}
                    </div>
                </div>
                <StarRating rating={review.rating} />
            </div>
            <p className="text-sm text-gray-600 leading-relaxed p-4">{review.text}</p>
        </div>
    );
}
export default ReviweCard