import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";

// Layout
import MainLayout from "../layouts/MainLayout";

// Lazy Pages
const HomePage = lazy(() => import("../pages/home/HomePage"));
const CarsPage = lazy(() => import("../pages/cars/CarsPage"));
const CarDetailsPage = lazy(() => import("../pages/cars/CarDetailsPage"));
const BookingPage = lazy(() => import("../pages/booking/BookingPage"));

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));

const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const MyBookingsPage = lazy(() => import("../pages/profile/MyBookingsPage"));

const BecomeHostPage = lazy(() => import("../pages/host/BecomeHostPage"));
const HostFormPage = lazy(() => import("../pages/host/HostFormPage"));
const HostSuccessPage = lazy(() => import("../pages/host/HostSuccessPage"));

const ContactPage = lazy(() => import("../pages/contact/ContactPage"));

const FavoritesPage = lazy(() => import("../pages/favorites/FavoritesPage"));
const NotesPage = lazy(() => import("../pages/notes/NotesPage"));

const PageLoader = () => (
    <div className="w-full h-screen flex items-center justify-center text-white">
        Loading...
    </div>
);

const withSuspense = (Component: React.ReactNode) => (
    <Suspense fallback={<PageLoader />}>
        {Component}
    </Suspense>
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                index: true,
                element: withSuspense(<HomePage />),
            },

            {
                path: "cars",
                element: withSuspense(<CarsPage />),
            },

            {
                path: "cars/:id",
                element: withSuspense(<CarDetailsPage />),
            },

            {
                path: "booking/:id",
                element: withSuspense(<BookingPage />),
            },

            {
                path: "login",
                element: withSuspense(<LoginPage />),
            },

            {
                path: "register",
                element: withSuspense(<RegisterPage />),
            },

            {
                path: "profile",
                element: withSuspense(<ProfilePage />),
            },

            {
                path: "my-bookings",
                element: withSuspense(<MyBookingsPage />),
            },

            {
                path: "become-host",
                element: withSuspense(<BecomeHostPage />),
            },

            {
                path: "become-host/apply",
                element: withSuspense(<HostFormPage />),
            },

            {
                path: "become-host/success",
                element: withSuspense(<HostSuccessPage />),
            },

            {
                path: "contact",
                element: withSuspense(<ContactPage />),
            },

            {
                path: "favorites",
                element: withSuspense(<FavoritesPage />),
            },

            {
                path: "notes",
                element: withSuspense(<NotesPage />),
            },
        ],
    },
]);