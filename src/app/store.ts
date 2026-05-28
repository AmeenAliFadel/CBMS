import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/auth/authSlice";
import carDetailsReducer from "./features/carDetails/carDetailsSlice";
import carsReducer from "./features/cars/carsSlice";
import favoritesReducer from "./features/favorites/favoritesSlice";
import supportReducer from "./features/support/supportSlice";
import lessorRequestReducer from "./features/lessorRequest/lessorRequestSlice";
import notificationsReducer from "./features/notifications/notificationsSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        cars: carsReducer,
        carDetails: carDetailsReducer,
        favorites: favoritesReducer,
        support: supportReducer,
        lessorRequest: lessorRequestReducer,
        notifications: notificationsReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;