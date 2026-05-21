import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import {
    fetchCurrentUser,
    markAuthInitialized,
} from "./features/auth/authSlice";

type AuthInitializerProps = {
    children: React.ReactNode;
};

export default function AuthInitializer({ children }: AuthInitializerProps) {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            dispatch(fetchCurrentUser());
        } else {
            dispatch(markAuthInitialized());
        }
    }, [dispatch]);

    return <>{children}</>;
}