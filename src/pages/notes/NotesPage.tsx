import { useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../app/hooks";

import {
  deleteNotificationThunk,
  fetchNotificationsThunk,
  resetNotificationsState,
} from "../../app/features/notifications/notificationsSlice";

import type { AppNotification } from "../../app/features/notifications/notificationsTypes";
import NotificationsHeader from "../../sections/NotesPageSections/NotificationsHeader";
import NotificationsStats from "../../sections/NotesPageSections/NotificationsStats";
import NotificationsList from "../../sections/NotesPageSections/NotificationsList";
import EmptyNotifications from "../../sections/NotesPageSections/EmptyNotifications";
import NotificationsSkeleton from "../../sections/NotesPageSections/NotificationsSkeleton";



const NotesPage = () => {
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
          notification.data.status?.toLowerCase() === "approved"
      ).length,
    [items]
  );

  const rejectedCount = useMemo(
    () =>
      items.filter(
        (notification) =>
          notification.data.status?.toLowerCase() === "rejected"
      ).length,
    [items]
  );

  const handleOpenNotification = async (
    notification: AppNotification
  ) => {
    const isApproved =
      notification.data.status?.toLowerCase() === "approved";

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

  const handleDeleteNotification = async (
    notificationId: string
  ) => {
    await dispatch(deleteNotificationThunk(notificationId));
  };

  return (
    <section className="relative min-h-screen overflow-hidden bg-background px-4 py-8 sm:px-6 lg:px-8">
      <div className="relative mx-auto flex w-full max-w-6xl flex-col gap-6">
        <NotificationsHeader
          onRefresh={() => dispatch(fetchNotificationsThunk())}
        />

        <NotificationsStats
          total={items.length}
          unread={unreadCount}
          hostUpdates={approvedCount + rejectedCount}
        />

        {errorMessage ? (
          <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
            {errorMessage}
          </div>
        ) : null}

        {loading ? (
          <NotificationsSkeleton />
        ) : items.length > 0 ? (
          <NotificationsList
            items={items}
            deletingId={deletingId}
            onOpen={handleOpenNotification}
            onDelete={handleDeleteNotification}
          />
        ) : (
          <EmptyNotifications />
        )}
      </div>
    </section>
  );
};

export default NotesPage;