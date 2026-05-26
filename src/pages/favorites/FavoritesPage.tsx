import { useEffect, useMemo } from "react";
import { FiHeart } from "react-icons/fi";
import { HiOutlineSparkles } from "react-icons/hi2";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { fetchFavorites } from "../../app/features/favorites/favoritesSlice";
import { CarCard } from "../../components/car/CarCard";

export default function FavoritesPage() {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );
  const authInitialized = useAppSelector((state) => state.auth.initialized);
  const favoritesInitialized = useAppSelector(
    (state) => state.favorites.initialized
  );
  const favorites = useAppSelector((state) => state.favorites.items);
  const loading = useAppSelector((state) => state.favorites.loading);
  const error = useAppSelector((state) => state.favorites.error);

  useEffect(() => {
    if (isAuthenticated && authInitialized && !favoritesInitialized && !loading) {
      dispatch(fetchFavorites());
    }
  }, [
    dispatch,
    isAuthenticated,
    authInitialized,
    favoritesInitialized,
    loading,
  ]);

  const favoriteCars = useMemo(() => {
    return favorites
      .filter((favorite) => favorite?.car)
      .map((favorite) => favorite.car);
  }, [favorites]);

  if (!authInitialized) {
    return (
      <section className="min-h-screen bg-background px-4 py-8 lg:px-10 xl:px-20 flex items-center justify-center">
        <div className="text-center text-text-secondary">
          Loading favorites...
        </div>
      </section>
    );
  }

  if (!isAuthenticated) {
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
  }

  if (loading && favorites.length === 0) {
    return (
      <section className="min-h-screen bg-background px-4 py-8 lg:px-10 xl:px-20 flex items-center justify-center">
        <div className="text-center text-text-secondary">
          Loading favorites...
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-background px-4 py-8 lg:px-10 xl:px-20">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5 mb-10">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-2xl bg-primary/10 text-primary flex items-center justify-center">
              <FiHeart size={22} />
            </div>

            <h1 className="text-3xl font-bold text-text-primary">
              Favorite Cars
            </h1>
          </div>

          <p className="text-text-secondary">
            Your saved luxury and premium vehicles.
          </p>
        </div>

        <div className="bg-surface border border-border shadow-sm rounded-2xl px-5 py-3 text-sm text-text-secondary flex items-center gap-2">
          <HiOutlineSparkles className="text-primary" size={18} />
          {favorites.length} Cars Saved
        </div>
      </div>

      {error && (
        <div className="mb-6 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          {error}
        </div>
      )}

      {favoriteCars.length === 0 ? (
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
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-7">
          {favoriteCars.map((car) => {
            if (!car?.id) {
              return null;
            }

            return (
              <CarCard
                key={car.id}
                car={car}
              />
            );
          })}
        </div>
      )}
    </section>
  );
}