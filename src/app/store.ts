import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import carDetailsReducer from "./features/carDetails/carDetailsSlice";
import carsReducer from "./features/cars/carsSlice";
import supportReducer from "./features/support/supportSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carsReducer,
        carDetails: carDetailsReducer,
        support: supportReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;