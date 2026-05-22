import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import carsReducer from "./features/cars/carsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;