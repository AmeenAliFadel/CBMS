import { FiHeart } from "react-icons/fi";
import { Link } from "react-router-dom";

const FavoritesAuthRequired = () => {
    return (
        <section className="min-h-screen bg-background px-4 py-8 lg:px-10 xl:px-20 flex items-center justify-center">
            <div className="max-w-lg w-full bg-surface border border-border rounded-2xl shadow-sm p-8 text-center">
                <div className="w-14 h-14 mx-auto rounded-2xl bg-primary/10 text-primary flex items-center justify-center mb-5">
                    <FiHeart size={24} />
                </div>

                <h1 className="text-3xl font-bold text-text-primary mb-3">
                    Favorite Cars
                </h1>

                <p className="text-text-secondary mb-6">
                    Please sign in to save and manage your favorite cars.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                    <Link
                        to="/login"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl bg-primary text-white font-semibold transition-all"
                    >
                        Go to Login
                    </Link>

                    <Link
                        to="/cars"
                        className="inline-flex items-center justify-center px-5 py-3 rounded-xl border border-border text-text-primary font-semibold transition-all"
                    >
                        Browse Cars
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default FavoritesAuthRequired;