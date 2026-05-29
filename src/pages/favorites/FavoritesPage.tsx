import { useEffect, useMemo } from "react";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import { fetchFavorites } from "../../app/features/favorites/favoritesSlice";
import FavoritesLoading from "../../sections/FavoritesPageSections/FavoritesLoading";
import FavoritesAuthRequired from "../../sections/FavoritesPageSections/FavoritesAuthRequired";
import FavoritesHeader from "../../sections/FavoritesPageSections/FavoritesHeader";
import FavoritesError from "../../sections/FavoritesPageSections/FavoritesError";
import FavoritesEmpty from "../../sections/FavoritesPageSections/FavoritesEmpty";
import FavoritesGrid from "../../sections/FavoritesPageSections/FavoritesGrid";



const FavoritesPage = () => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  const authInitialized = useAppSelector(
    (state) => state.auth.initialized
  );

  const favoritesInitialized = useAppSelector(
    (state) => state.favorites.initialized
  );

  const favorites = useAppSelector(
    (state) => state.favorites.items
  );

  const loading = useAppSelector(
    (state) => state.favorites.loading
  );

  const error = useAppSelector(
    (state) => state.favorites.error
  );

  useEffect(() => {
    if (
      isAuthenticated &&
      authInitialized &&
      !favoritesInitialized &&
      !loading
    ) {
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
    return <FavoritesLoading />;
  }

  if (!isAuthenticated) {
    return <FavoritesAuthRequired />;
  }

  if (loading && favorites.length === 0) {
    return <FavoritesLoading />;
  }

  return (
    <section className="min-h-screen bg-background px-4 py-8 lg:px-10 xl:px-20">
      <FavoritesHeader total={favorites.length} />

      {error && <FavoritesError error={error} />}

      {favoriteCars.length === 0 ? (
        <FavoritesEmpty />
      ) : (
        <FavoritesGrid cars={favoriteCars} />
      )}
    </section>
  );
};

export default FavoritesPage;