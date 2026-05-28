import { useEffect, useMemo } from "react";
import { HiOutlineBell } from "react-icons/hi2";
import { FiRefreshCw } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";
import {
  deleteNotificationThunk,
  fetchNotificationsThunk,
  resetNotificationsState,
} from "../../app/features/notifications/notificationsSlice";
import NotificationCard from "../../components/notifications/NotificationCard";
import type { AppNotification } from "../../app/features/notifications/notificationsTypes";

export default function NotesPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const { items, loading, deletingId, errorMessage } = useAppSelector(
    (state) => state.notifications
  );

  useEffect(() => {
    dispatch(fetchNotificationsThunk());

    return () => {
      dispatch(resetNotificationsState());
    };
  }, [dispatch]);

  const unreadCount = useMemo(
    () => items.filter((notification) => notification.read_at === null).length,
    [items]
  );

  const approvedCount = useMemo(
    () =>
      items.filter(
        (notification) =>
          notification.data.status.toLowerCase() === "approved"
      ).length,
    [items]
  );

  const rejectedCount = useMemo(
    () =>
      items.filter(
        (notification) =>
          notification.data.status.toLowerCase() === "rejected"
      ).length,
    [items]
  );

  const handleOpenNotification = async (notification: AppNotification) => {
    const isApproved =
      notification.data.status.toLowerCase() === "approved";

    await dispatch(deleteNotificationThunk(notification.id));

    if (isApproved) {
      navigate("/become-host/approved");
      return;
    }

    const targetUrl = notification.data.url?.trim();

    if (targetUrl) {
      navigate(targetUrl);
    }
  };

  const handleDeleteNotification = async (notificationId: string) => {
    await dispatch(deleteNotificationThunk(notificationId));
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute inset-0 flex items-center justify-center">
        <HiOutlineBell className="h-[280px] w-[280px] text-primary/6 animate-float sm:h-[420px] sm:w-[420px] md:h-[600px] md:w-[600px]" />
      </div>

      <div className="absolute -left-40 -top-40 h-[420px] w-[420px] rounded-full bg-primary/10 blur-3xl sm:h-[500px] sm:w-[500px]" />
      <div className="absolute -bottom-40 -right-40 h-[320px] w-[320px] rounded-full bg-secondary/10 blur-3xl sm:h-[400px] sm:w-[400px]" />

      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6">
        <div className="rounded-3xl border border-border bg-white/70 p-5 shadow-[0_10px_30px_rgba(34,35,58,0.05)] backdrop-blur-sm sm:p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <p className="mb-2 text-[12px] font-semibold uppercase tracking-[0.18em] text-primary/70">
                Notifications
              </p>

              <h1 className="text-3xl font-bold tracking-[-0.03em] text-primary sm:text-4xl lg:text-[44px]">
                Your notifications
              </h1>

              <p className="mt-3 max-w-2xl text-[14px] leading-7 text-text-secondary sm:text-[15px]">
                Review updates from the platform, including host request status
                changes. Open any notification to view its destination and
                automatically remove it from your list.
              </p>
            </div>

            <button
              type="button"
              onClick={() => dispatch(fetchNotificationsThunk())}
              className="inline-flex items-center gap-2 self-start rounded-xl border border-border bg-white px-4 py-2.5 text-[13px] font-semibold text-text-primary transition-all duration-200 hover:border-primary hover:text-primary"
            >
              <FiRefreshCw className="text-base" />
              Refresh
            </button>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-3">
            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-text-secondary">
                Total
              </p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {items.length}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-text-secondary">
                Unread
              </p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {unreadCount}
              </p>
            </div>

            <div className="rounded-2xl border border-border bg-background/70 p-4">
              <p className="text-[12px] font-medium uppercase tracking-[0.14em] text-text-secondary">
                Host updates
              </p>
              <p className="mt-2 text-2xl font-bold text-text-primary">
                {approvedCount + rejectedCount}
              </p>
            </div>
          </div>
        </div>

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {loading ? (
          <div className="grid gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="animate-pulse rounded-2xl border border-border bg-white p-5 shadow-[0_8px_25px_rgba(34,35,58,0.04)]"
              >
                <div className="flex gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-bg" />
                  <div className="flex-1">
                    <div className="h-4 w-2/5 rounded bg-bg" />
                    <div className="mt-3 h-3 w-full rounded bg-bg" />
                    <div className="mt-2 h-3 w-4/5 rounded bg-bg" />
                    <div className="mt-4 h-3 w-1/4 rounded bg-bg" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : items.length > 0 ? (
          <div className="grid gap-4">
            {items.map((notification) => (
              <NotificationCard
                key={notification.id}
                notification={notification}
                isDeleting={deletingId === notification.id}
                onOpen={handleOpenNotification}
                onDelete={handleDeleteNotification}
              />
            ))}
          </div>
        ) : (
          <div className="flex min-h-[420px] items-center justify-center rounded-3xl border border-border bg-white/75 p-6 shadow-[0_10px_30px_rgba(34,35,58,0.05)] backdrop-blur-sm">
            <div className="relative text-center">
              <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-primary">
                <HiOutlineBell className="h-10 w-10" />
              </div>

              <h2 className="text-2xl font-bold text-primary/70 sm:text-3xl">
                No Notifications Yet
              </h2>

              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-text-secondary sm:text-base">
                You&apos;re all caught up. We&apos;ll notify you when something
                new arrives.
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}