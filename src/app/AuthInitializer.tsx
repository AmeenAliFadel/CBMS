import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import {
    fetchCurrentUser,
    markAuthInitialized,
} from "./features/auth/authSlice";
import { fetchFavorites } from "./features/favorites/favoritesSlice";
import { fetchNotificationsThunk } from "./features/notifications/notificationsSlice";

type AuthInitializerProps = {
    children: React.ReactNode;
};

export default function AuthInitializer({
    children,
}: AuthInitializerProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            dispatch(fetchCurrentUser())
                .unwrap()
                .then(() => {
                    dispatch(fetchFavorites());
                    dispatch(fetchNotificationsThunk());
                })
                .catch(() => {
                    localStorage.removeItem("token");
                });
        } else {
            dispatch(markAuthInitialized());
        }
    }, [dispatch]);

    return <>{children}</>;
}