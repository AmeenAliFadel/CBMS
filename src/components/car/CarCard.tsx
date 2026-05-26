import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { toggleFavorite } from "../../app/features/favorites/favoritesSlice";
import {
    selectIsFavorite,
    selectIsFavoritePending,
} from "../../app/features/favorites/favoritesSelectors";
import type { Car } from "../../app/features/cars/carsTypes";
import { resolveImageUrl } from "../../utils/resolveImageUrl";

interface CarCardProps {
    car: Car;
    onFavoriteToggle?: (id: number, isFav: boolean) => void;
}

type CarImageSource = Car & {
    image?: string | null;
    image_url?: string | null;
    main_image?: string | null;
};

export function CarCard({ car, onFavoriteToggle }: CarCardProps) {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [imageError, setImageError] = useState(false);

    const isAuthenticated = useAppSelector(
        (state) => state.auth.isAuthenticated
    );

    const isFavorite = useAppSelector((state) =>
        selectIsFavorite(state, car.id)
    );

    const isPending = useAppSelector((state) =>
        selectIsFavoritePending(state, car.id)
    );

    const handleFavorite = () => {
        if (!isAuthenticated) {
            navigate("/login");
            return;
        }

        const nextValue = !isFavorite;

        dispatch(toggleFavorite(car.id));
        onFavoriteToggle?.(car.id, nextValue);
    };

    const typedCar = car as CarImageSource;
    const fallbackImage =
        typedCar.images?.main ??
        typedCar.main_image ??
        typedCar.image_url ??
        typedCar.image ??
        null;

    const carImage = resolveImageUrl(fallbackImage);

    return (
        <article
            data-aos="fade-up"
            className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full w-full"
        >
            <div className="w-full relative">
                <button
                    type="button"
                    onClick={handleFavorite}
                    disabled={isPending}
                    className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all ${isFavorite ? "bg-gray-200" : "bg-white"
                        } ${isPending ? "opacity-60 cursor-not-allowed" : ""}`}
                    aria-label={
                        isAuthenticated
                            ? isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                            : "Go to login"
                    }
                    aria-busy={isPending}
                >
                    {isPending ? (
                        <div className="w-4 h-4 border-2 border-gray-300 border-t-primary rounded-full animate-spin" />
                    ) : isFavorite ? (
                        <FaHeart className="text-primary text-lg transition-colors" />
                    ) : (
                        <CiHeart className="text-gray-400 text-xl transition-colors" />
                    )}
                </button>

                {!imageError && carImage ? (
                    <img
                        src={carImage}
                        alt={car.title}
                        className="w-full h-56 object-cover"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-56 bg-gray-100 flex items-center justify-center text-sm text-gray-500">
                        No image available
                    </div>
                )}
            </div>

            <div className="flex flex-col flex-1 p-4">
                <div className="flex gap-3 justify-between items-start mb-2">
                    <div>
                        <h3 className="text-sm font-bold leading-tight text-text-primary mb-1">
                            {car.title}
                        </h3>
                        <p className="text-xs text-text-secondary">
                            {car.brand} {car.model}
                        </p>
                    </div>

                    <div className="text-right">
                        <p className="text-xs text-text-secondary">Year</p>
                        <p className="text-sm font-semibold text-text-primary">
                            {car.year}
                        </p>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2 text-xs text-text-secondary mb-3">
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        {car.car_type?.name}
                    </span>
                    <span
                        className={`px-2 py-1 rounded-full ${car.status === "available"
                                ? "bg-emerald-50 text-emerald-700"
                                : "bg-rose-50 text-rose-700"
                            }`}
                    >
                        {car.status}
                    </span>
                    <span className="px-2 py-1 rounded-full bg-gray-100 text-gray-700">
                        Owner: {car.owner?.name}
                    </span>
                </div>

                {car.features?.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {car.features.slice(0, 4).map((feature) => (
                            <span
                                key={feature.id}
                                className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-primary border border-border"
                            >
                                {feature.name}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
                    <div>
                        <span className="text-lg font-extrabold text-text-primary">
                            ${car.price_per_day}
                        </span>
                        <span className="text-xs text-text-secondary"> /day</span>
                    </div>

                    <Link
                        to={`/cars/${car.id}`}
                        className="px-4 py-2 text-xs font-bold text-white transition-all bg-primary rounded-xl active:scale-95 flex items-center justify-center"
                    >
                        Details
                    </Link>
                </div>
            </div>
        </article>
    );
}