import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { MdDirectionsCar, MdRefresh } from "react-icons/md";
import toast from "react-hot-toast";

import { useAppDispatch, useAppSelector } from "../../../app/hooks";
import {
  cancelBooking,
  fetchBookings,
} from "../../../app/features/bookings/bookingSlice";
import {
  selectBookingCancelLoading,
  selectBookingError,
  selectBookingItems,
  selectBookingLoading,
} from "../../../app/features/bookings/bookingSelectors";
import type { Booking } from "../../../app/features/bookings/bookingTypes";
import TripCard from "./TripCard";
import TabBar from "./TabBar";
import {
  getBookingTab,
  type BookingTab,
} from "../../../utils/bookingDisplay";

function BookingSkeletonCard() {
  return (
    <div className="flex w-full animate-pulse flex-col overflow-hidden rounded-2xl border border-border bg-surface md:flex-row">
      <div className="h-44 w-full bg-background md:h-auto md:w-48" />
      <div className="flex flex-1 flex-col gap-4 p-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="h-3 w-24 rounded-full bg-background" />
            <div className="mt-3 h-5 w-52 max-w-full rounded-full bg-background" />
            <div className="mt-2 h-4 w-36 rounded-full bg-background" />
          </div>
          <div className="h-8 w-24 rounded-full bg-background" />
        </div>

        <div className="h-4 w-40 rounded-full bg-background" />
        <div className="h-4 w-52 rounded-full bg-background" />

        <div className="flex flex-wrap gap-2">
          <div className="h-7 w-20 rounded-lg bg-background" />
          <div className="h-7 w-20 rounded-lg bg-background" />
          <div className="h-7 w-16 rounded-lg bg-background" />
        </div>

        <div className="mt-1 flex gap-3">
          <div className="h-12 flex-1 rounded-xl bg-background md:max-w-40" />
          <div className="h-12 flex-1 rounded-xl bg-background md:max-w-40" />
        </div>
      </div>
    </div>
  );
}

export default function TripsSection() {
  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const bookings = useAppSelector(selectBookingItems);
  const loading = useAppSelector(selectBookingLoading);
  const cancelLoading = useAppSelector(selectBookingCancelLoading);
  const error = useAppSelector(selectBookingError);

  const [activeTab, setActiveTab] = useState<BookingTab>("active");

  useEffect(() => {
    if (!isAuthenticated) {
      return;
    }

    dispatch(fetchBookings());
  }, [dispatch, isAuthenticated]);

  const sortedBookings = useMemo(() => {
    return [...bookings].sort((first, second) => {
      const firstTime = new Date(first.start_date.replace(" ", "T")).getTime();
      const secondTime = new Date(second.start_date.replace(" ", "T")).getTime();

      return secondTime - firstTime;
    });
  }, [bookings]);

  const tabCounts = useMemo(() => {
    return sortedBookings.reduce<Record<BookingTab, number>>(
      (accumulator, booking) => {
        const tab = getBookingTab(booking);
        accumulator[tab] += 1;
        return accumulator;
      },
      {
        active: 0,
        completed: 0,
        cancelled: 0,
      }
    );
  }, [sortedBookings]);

  const visibleBookings = useMemo(() => {
    return sortedBookings.filter((booking) => getBookingTab(booking) === activeTab);
  }, [sortedBookings, activeTab]);

  const handleCancelBooking = async (bookingId: number) => {
    try {
      await dispatch(cancelBooking(bookingId)).unwrap();
      toast.success("Booking canceled successfully");
    } catch (caughtError) {
      const message =
        typeof caughtError === "string"
          ? caughtError
          : "Failed to cancel booking. Please try again.";

      toast.error(message);
    }
  };

  const retryFetch = () => {
    dispatch(fetchBookings());
  };

  if (!isAuthenticated) {
    return (
      <div
        data-aos="fade-up"
        className="flex w-full flex-col gap-4 rounded-2xl border border-border bg-surface p-6"
      >
        <div className="flex items-start gap-3">
          <div className="rounded-2xl border border-border bg-background p-3">
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-text-primary">Your bookings</h2>
            <p className="mt-1 text-sm text-text-secondary">
              Sign in to view, manage, and cancel your bookings from one place.
            </p>
          </div>
        </div>

        <Link
          to="/login"
          className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90 sm:w-fit"
        >
          <span>Go to login</span>
        </Link>
      </div>
    );
  }

  return (
    <div
      data-aos="fade-up"
      className="flex w-full flex-col overflow-hidden rounded-2xl border border-border bg-surface"
    >
      <div className="flex flex-col gap-2 p-4 pb-0">
        <h2 className="text-xl font-bold text-text-primary">My Bookings</h2>
        <p className="text-sm text-text-secondary">
          Track active, completed, and cancelled bookings.
        </p>
      </div>

      <div className="px-4 pt-4">
        <TabBar
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          counts={tabCounts}
        />
      </div>

      <div className="flex flex-col gap-4 p-4">
        {loading && bookings.length === 0 ? (
          <>
            <BookingSkeletonCard />
            <BookingSkeletonCard />
            <BookingSkeletonCard />
          </>
        ) : error && bookings.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border bg-background px-6 py-14 text-center">
            <div className="rounded-full border border-border bg-surface p-4">
              <MdRefresh className="text-3xl text-primary" />
            </div>
            <div className="max-w-md">
              <h3 className="text-lg font-semibold text-text-primary">
                Unable to load bookings
              </h3>
              <p className="mt-2 text-sm text-text-secondary">{error}</p>
            </div>
            <button
              type="button"
              onClick={retryFetch}
              className="inline-flex items-center justify-center rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Retry
            </button>
          </div>
        ) : visibleBookings.length > 0 ? (
          visibleBookings.map((booking: Booking) => (
            <TripCard
              key={booking.id}
              booking={booking}
              onCancel={handleCancelBooking}
              cancelLoading={cancelLoading}
            />
          ))
        ) : (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-border bg-background px-6 py-14 text-center">
            <MdDirectionsCar className="text-5xl text-text-secondary opacity-40" />
            <div>
              <p className="text-base font-semibold text-text-primary">
                {activeTab === "active"
                  ? "No active bookings yet"
                  : activeTab === "completed"
                    ? "No completed bookings yet"
                    : "No cancelled bookings yet"}
              </p>
              <p className="mt-1 text-sm text-text-secondary">
                Your bookings will appear here once they are created.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}