import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState } from "react";

// Layout
import MainLayout from "../layouts/MainLayout";

// Loader
import Loader from "../components/ui/loader/Loader";

// Lazy Pages
const HomePage = lazy(() => import("../pages/home/HomePage"));
const CarsPage = lazy(() => import("../pages/cars/CarsPage"));
const CarDetailsPage = lazy(() => import("../pages/cars/CarDetailsPage"));
const BookingPage = lazy(() => import("../pages/booking/BookingPage"));
const BookingPendingPage = lazy(() => import("../pages/booking/BookingPendingPage"));

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));

const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const MyBookingsPage = lazy(() => import("../pages/profile/MyBookingsPage"));

const BecomeHostPage = lazy(() => import("../pages/host/BecomeHostPage"));
const HostFormPage = lazy(() => import("../pages/host/HostFormPage"));
const HostSuccessPage = lazy(() => import("../pages/host/HostSuccessPage"));
const HostApprovedPage = lazy(() => import("../pages/host/HostApprovedPage"));

const ContactPage = lazy(() => import("../pages/contact/ContactPage"));

const FavoritesPage = lazy(() => import("../pages/favorites/FavoritesPage"));
const NotesPage = lazy(() => import("../pages/notes/NotesPage"));

// Loader Delay Component
const DelayedLoader = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return <>{children}</>;
};


// Wrapper Component
const SuspenseLayout = () => (
  <Suspense fallback={<Loader />}>
    <DelayedLoader>
      <MainLayout />
    </DelayedLoader>
  </Suspense>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <SuspenseLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "cars",
        element: <CarsPage />,
      },

      {
        path: "cars/:id",
        element: <CarDetailsPage />,
      },

      {
        path: "booking/:id",
        element: <BookingPage />,
      },
      {
        path: "booking-pending",
        element: <BookingPendingPage />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },

      {
        path: "register",
        element: <RegisterPage />,
      },

      {
        path: "profile",
        element: <ProfilePage />,
      },

      {
        path: "my-bookings",
        element: <MyBookingsPage />,
      },

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
      {
        path: "become-host/approved",
        element: <HostApprovedPage />,
      },

      {
        path: "contact",
        element: <ContactPage />,
      },

      {
        path: "favorites",
        element: <FavoritesPage />,
      },

      {
        path: "notes",
        element: <NotesPage />,
      },
    ],
  },
]);