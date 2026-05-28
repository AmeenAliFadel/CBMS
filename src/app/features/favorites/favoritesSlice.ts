import {
    createAsyncThunk,
    createSlice,
} from "@reduxjs/toolkit";

import type { RootState } from "../../store";

import { logoutUser } from "../auth/authSlice";

import {
    addFavoriteRequest,
    getFavoritesRequest,
    removeFavoriteRequest,
} from "./favoritesApi";

import { getFavoritesErrorMessage } from "./favoritesError";

import type {
    Favorite,
    FavoritesState,
    FavoriteToggleResult,
} from "./favoritesTypes";

const initialState: FavoritesState = {
    items: [],
    favoriteIds: [],
    loading: false,
    actionLoading: false,
    pendingIds: [],
    error: null,
    initialized: false,
};

export const fetchFavorites = createAsyncThunk<
    Favorite[],
    void,
    { rejectValue: string }
>(
    "favorites/fetchFavorites",

    async (_, { rejectWithValue }) => {
        try {
            return await getFavoritesRequest();
        } catch (error: unknown) {
            return rejectWithValue(
                getFavoritesErrorMessage(
                    error,
                    "Failed to load favorites"
                )
            );
        }
    }
);

export const toggleFavorite = createAsyncThunk<
    FavoriteToggleResult,
    number,
    { state: RootState; rejectValue: string }
>(
    "favorites/toggleFavorite",

    async (carId, { getState, rejectWithValue }) => {
        try {
            const state = getState();

            const isFavorite =
                state.favorites.favoriteIds.includes(carId);

            if (isFavorite) {
                await removeFavoriteRequest(carId);

                return {
                    carId,
                    isFavorite: false,
                };
            }

            const favorite = await addFavoriteRequest(carId);

            return {
                carId,
                isFavorite: true,
                favorite,
            };
        } catch (error: unknown) {
            return rejectWithValue(
                getFavoritesErrorMessage(
                    error,
                    "Failed to update favorites"
                )
            );
        }
    }
);

const favoritesSlice = createSlice({
    name: "favorites",

    initialState,

    reducers: {},

    extraReducers: (builder) => {
        builder

            .addCase(fetchFavorites.pending, (state) => {
                state.loading = true;
                state.error = null;
            })

            .addCase(fetchFavorites.fulfilled, (state, action) => {
                state.loading = false;

                state.items = action.payload;

                state.favoriteIds = action.payload.map(
                    (favorite) => favorite.car_id
                );

                state.initialized = true;
                state.error = null;
            })

            .addCase(fetchFavorites.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    action.payload ||
                    "Failed to load favorites";

                state.initialized = true;
            })

            .addCase(
                toggleFavorite.pending,
                (state, action) => {
                    state.actionLoading = true;
                    state.error = null;

                    const carId = action.meta.arg;

                    if (
                        !state.pendingIds.includes(carId)
                    ) {
                        state.pendingIds.push(carId);
                    }
                }
            )

            .addCase(
                toggleFavorite.fulfilled,
                (state, action) => {
                    state.actionLoading = false;

                    const {
                        carId,
                        isFavorite,
                        favorite,
                    } = action.payload;

                    state.pendingIds =
                        state.pendingIds.filter(
                            (id) => id !== carId
                        );

                    if (isFavorite && favorite) {
                        const alreadyExists =
                            state.favoriteIds.includes(
                                carId
                            );

                        if (!alreadyExists) {
                            state.favoriteIds.unshift(
                                carId
                            );

                            state.items.unshift(
                                favorite
                            );
                        }

                        return;
                    }

                    state.favoriteIds =
                        state.favoriteIds.filter(
                            (id) => id !== carId
                        );

                    state.items = state.items.filter(
                        (item) =>
                            item.car_id !== carId
                    );
                }
            )

            .addCase(
                toggleFavorite.rejected,
                (state, action) => {
                    state.actionLoading = false;

                    const carId = action.meta.arg;

                    state.pendingIds =
                        state.pendingIds.filter(
                            (id) => id !== carId
                        );

                    state.error =
                        action.payload ||
                        "Failed to update favorites";
                }
            )

            .addCase(
                logoutUser.fulfilled,
                () => initialState
            )

            .addCase(
                logoutUser.rejected,
                () => initialState
            );
    },
});

export default favoritesSlice.reducer;