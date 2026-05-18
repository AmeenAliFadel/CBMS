import { useState } from "react";
import { Link } from "react-router-dom";
import type { Car } from "../../data/carShow/CarShow";
import { CiHeart } from "react-icons/ci";
import { FaHeart } from "react-icons/fa";
import { TiStarFullOutline } from "react-icons/ti";

interface CarCardProps {
    car: Car;
    onFavoriteToggle?: (id: number, isFav: boolean) => void;
}

export function CarCard({ car, onFavoriteToggle }: CarCardProps) {

    const [fav, setFav] = useState(car.favorite ?? false);

    const handleFavorite = () => {
        const nextValue = !fav;
        setFav(nextValue);
        onFavoriteToggle?.(car.id, nextValue)
    }

    return (
        <div className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 flex flex-col">
            <div className="w-full relative">

                {/* Favorite Button */}
                <button onClick={handleFavorite} className={`absolute top-3 right-3 z-10 w-9 h-9 flex items-center justify-center rounded-full transition-all ${fav ? "bg-gray-200" : "bg-white"}`}>
                    {fav ? (<FaHeart className="text-primary text-lg transition-colors" />)
                        : (<CiHeart className="text-gray-400 text-xl transition-colors" />)}
                </button>

                {/* Car Image */}
                <img src={car.image} alt={car.name} className="w-full object-cover" onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }} />
            </div>

            <div className="flex flex-col flex-1 p-4">

                {/* Car Name */}
                <div className="flex gap-1 justify-between">
                    <h3 className="text-sm font-bold leading-tight text-text-primary mb-1"> {car.name} </h3>
                    <div className="flex items-center gap-2 mb-3">
                        <TiStarFullOutline color="#6C4EFF" />

                        <p className="text-text-primary"> {car.rating} </p>
                    </div>
                </div>

                {/**INFO */}

                <div className="flex items-center gap-3 text-xs text-text-secondary mb-3">

                    <span className="flex items-center gap-1"> {car.fuel} </span>
                    <span className="flex items-center gap-1"> {car.seats} Seats </span>

                    <span className="flex items-center gap-1">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-3.5 h-3.5" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                            <circle cx="12" cy="12" r="3" />
                        </svg>

                        {car.transmission}
                    </span>
                </div>

                {car.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mb-3">
                        {car.tags.map((tag) => (
                            <span key={tag} className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-white text-primary border border-border" >
                                {tag}
                            </span>
                        ))}
                    </div>
                )}

                <div className="flex items-center justify-between pt-3 mt-auto border-t border-border">
                    {/* Price */}
                    <div>
                        <span className="text-lg font-extrabold text-text-primary"> ${car.price} </span>
                        <span className="text-xs text-text-secondary"> /day</span>
                    </div>
                    {/* Details Button */}
                    <Link
                        to={`/cars/${car.id}`}
                        className="px-4 py-2 text-xs font-bold text-white transition-all bg-primary rounded-xl active:scale-95 flex items-center justify-center" >
                        Details
                    </Link>
                </div>

            </div>

        </div>
    );
}