import { createBrowserRouter } from "react-router-dom";

// Layout
import MainLayout from "../layouts/MainLayout";

// Pages
import HomePage from "../pages/home/HomePage";
import CarsPage from "../pages/cars/CarsPage";
import CarDetailsPage from "../pages/cars/CarDetailsPage";
import BookingPage from "../pages/booking/BookingPage";

import LoginPage from "../pages/auth/LoginPage";
import RegisterPage from "../pages/auth/RegisterPage";

import ProfilePage from "../pages/profile/ProfilePage";
import MyBookingsPage from "../pages/profile/MyBookingsPage";

import BecomeHostPage from "../pages/host/BecomeHostPage";
import HostFormPage from "../pages/host/HostFormPage";
import HostSuccessPage from "../pages/host/HostSuccessPage";

import ContactPage from "../pages/contact/ContactPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <MainLayout />,
        children: [
            // 🏠 Home
            {
                index: true,
                element: <HomePage />,
            },

            // 🚗 Cars
            {
                path: "cars",
                element: <CarsPage />,
            },
            {
                path: "cars/:id",
                element: <CarDetailsPage />,
            },

            // 📅 Booking
            {
                path: "booking/:id",
                element: <BookingPage />,
            },

            // 🔐 Auth
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <RegisterPage />,
            },

            // 👤 Profile
            {
                path: "profile",
                element: <ProfilePage />,
            },
            {
                path: "my-bookings",
                element: <MyBookingsPage />,
            },

            // 🚀 Host Flow
            {
                path: "become-host",
                element: <BecomeHostPage />,
            },
            {
                path: "become-host/apply",
                element: <HostFormPage />,
            },
            {
                path: "become-host/success",
                element: <HostSuccessPage />,
            },

            // 📞 Contact
            {
                path: "contact",
                element: <ContactPage />,
            },
        ],
    },
]);