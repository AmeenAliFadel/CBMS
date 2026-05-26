import {
    createAsyncThunk,
    createSlice,
    type PayloadAction,
} from "@reduxjs/toolkit";

import { getCars } from "./carsApi";
import { getCarsErrorMessage } from "./carsError";
import type {
    CarsFilters,
    CarsSortOption,
    CarsState,
} from "./carsTypes";

export const DEFAULT_CAR_FILTERS: CarsFilters = {
    carType: "",
    model: "",
    maxPrice: 2500,
};

export const DEFAULT_CAR_SORT: CarsSortOption = "featured";

const initialState: CarsState = {
    items: [],
    loading: false,
    error: null,

    filters: { ...DEFAULT_CAR_FILTERS },
    searchTerm: "",
    sortBy: DEFAULT_CAR_SORT,

    meta: null,
    links: null,

    page: 1,
};

export const fetchCars = createAsyncThunk(
    "cars/fetchCars",
    async (filters: CarsFilters | void, thunkApi) => {
        try {
            const state = thunkApi.getState() as any;

            return await getCars({
                ...state.cars.filters,
                ...filters,
                page: state.cars.page,
            });
        } catch (error) {
            return thunkApi.rejectWithValue(
                getCarsErrorMessage(error)
            );
        }
    }
);

const carsSlice = createSlice({
    name: "cars",
    initialState,
    reducers: {
        setFilters(state, action: PayloadAction<CarsFilters>) {
            state.filters = action.payload;
            state.page = 1;
        },

        resetFilters(state) {
            state.filters = { ...DEFAULT_CAR_FILTERS };
            state.page = 1;
        },

        setSearchTerm(state, action: PayloadAction<string>) {
            state.searchTerm = action.payload;
        },

        setSortBy(state, action: PayloadAction<CarsSortOption>) {
            state.sortBy = action.payload;
        },

        resetSearchAndSort(state) {
            state.searchTerm = "";
            state.sortBy = DEFAULT_CAR_SORT;
        },

        setPage(state, action: PayloadAction<number>) {
            state.page = action.payload;
        },
    },

    extraReducers: (builder) => {
        builder
            .addCase(fetchCars.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCars.fulfilled, (state, action) => {
                state.loading = false;

                state.items = action.payload.data;

                state.meta = action.payload.meta;
                state.links = action.payload.links;
            })
            .addCase(fetchCars.rejected, (state, action) => {
                state.loading = false;

                state.error =
                    (action.payload as string) ??
                    "Failed to fetch cars. Please try again.";
            });
    },
});

export const {
    setFilters,
    resetFilters,
    setSearchTerm,
    setSortBy,
    resetSearchAndSort,
    setPage,
} = carsSlice.actions;

export default carsSlice.reducer;