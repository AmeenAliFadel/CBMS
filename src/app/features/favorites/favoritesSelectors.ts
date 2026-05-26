import type { RootState } from "../../store";

export const selectFavoriteItems = (
    state: RootState
) => state.favorites.items;

export const selectFavoriteIds = (
    state: RootState
) => state.favorites.favoriteIds;

export const selectFavoritesLoading = (
    state: RootState
) => state.favorites.loading;

export const selectFavoritesInitialized = (
    state: RootState
) => state.favorites.initialized;

export const selectFavoritesError = (
    state: RootState
) => state.favorites.error;

export const selectFavoritePendingIds = (
    state: RootState
) => state.favorites.pendingIds;

export const selectIsFavorite = (
    state: RootState,
    carId: number
) => state.favorites.favoriteIds.includes(carId);

export const selectIsFavoritePending = (
    state: RootState,
    carId: number
) => state.favorites.pendingIds.includes(carId);