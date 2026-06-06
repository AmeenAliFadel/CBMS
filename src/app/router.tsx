import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense, useEffect, useState, type ReactNode } from "react";

import MainLayout from "../layouts/MainLayout";
import Loader from "../components/ui/loader/Loader";

const HomePage = lazy(() => import("../pages/home/HomePage"));
const CarsPage = lazy(() => import("../pages/cars/CarsPage"));
const CarDetailsPage = lazy(() => import("../pages/cars/CarDetailsPage"));
const BookingPage = lazy(() => import("../pages/booking/BookingPage"));
const BookingPendingPage = lazy(
  () => import("../pages/booking/BookingPendingPage")
);
const BookingChatPage = lazy(() => import("../pages/chat/BookingChatPage"));

const LoginPage = lazy(() => import("../pages/auth/LoginPage"));
const RegisterPage = lazy(() => import("../pages/auth/RegisterPage"));

const ProfilePage = lazy(() => import("../pages/profile/ProfilePage"));
const BookingDetailsPage = lazy(
  () => import("../pages/profile/BookingDetailsPage")
);

const BecomeHostPage = lazy(() => import("../pages/host/BecomeHostPage"));
const HostFormPage = lazy(() => import("../pages/host/HostFormPage"));
const HostSuccessPage = lazy(() => import("../pages/host/HostSuccessPage"));
const HostApprovedPage = lazy(() => import("../pages/host/HostApprovedPage"));

const ContactPage = lazy(() => import("../pages/contact/ContactPage"));

const FavoritesPage = lazy(() => import("../pages/favorites/FavoritesPage"));
const NotesPage = lazy(() => import("../pages/notes/NotesPage"));

const MembershipPlansPage = lazy(
  () => import("../pages/membership/MembershipPlansPage")
);
const MembershipUpgradePage = lazy(
  () => import("../pages/membership/MembershipUpgradePage")
);

const DelayedLoader = ({ children }: { children: ReactNode }) => {
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
        path: "/dashboard/bookings/:bookingId/chat",
        element: <BookingChatPage />,
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
        path: "profile/bookings/:bookingId",
        element: <BookingDetailsPage />,
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
      {
        path: "membership",
        element: <MembershipPlansPage />,
      },
      {
        path: "membership/upgrade",
        element: <MembershipUpgradePage />,
      },
    ],
  },
]);