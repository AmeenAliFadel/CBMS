import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { Car } from "../cars/carsTypes";
import { getCarDetails } from "./carDetailsApi";
import { getCarDetailsErrorMessage } from "./carDetailsError";
import type { CarDetailsState } from "./carDetailsTypes";

const initialState: CarDetailsState = {
    item: null,
    loading: false,
    error: null,
};

export const fetchCarDetails = createAsyncThunk<
    Car,
    number,
    { rejectValue: string }
>("carDetails/fetchCarDetails", async (carId, thunkApi) => {
    try {
        const response = await getCarDetails(carId);
        return response.data;
    } catch (error) {
        return thunkApi.rejectWithValue(getCarDetailsErrorMessage(error));
    }
});

const carDetailsSlice = createSlice({
    name: "carDetails",
    initialState,
    reducers: {
        resetCarDetails(state) {
            state.item = null;
            state.loading = false;
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCarDetails.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchCarDetails.fulfilled, (state, action) => {
                state.loading = false;
                state.item = action.payload;
            })
            .addCase(fetchCarDetails.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to fetch car details. Please try again.";
            });
    },
});

export const { resetCarDetails } = carDetailsSlice.actions;
export default carDetailsSlice.reducer;