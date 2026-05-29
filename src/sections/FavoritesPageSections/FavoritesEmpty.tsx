import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const FavoritesEmpty = () => {
    return (
        <div className="bg-surface border border-border rounded-2xl shadow-sm p-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                <FiHeart size={24} />
            </div>

            <h2 className="text-2xl font-bold text-text-primary mb-3">
                No favorites yet
            </h2>

            <p className="text-text-secondary mb-6">
                Start exploring cars and save the ones you like.
            </p>

            <Link
                to="/cars"
                className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white font-semibold transition-all"
            >
                Browse Cars
            </Link>
        </div>
    );
};

export default FavoritesEmpty;