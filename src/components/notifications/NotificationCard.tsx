import type { AppNotification } from "../../app/features/notifications/notificationsTypes";
import { FiExternalLink, FiTrash2 } from "react-icons/fi";

interface NotificationCardProps {
    notification: AppNotification;
    onOpen: (notification: AppNotification) => void;
    onDelete: (notificationId: string) => void;
    isDeleting?: boolean;
}

const getStatusStyles = (status: string) => {
    const normalized = status.toLowerCase();

    if (normalized === "approved") {
        return {
            badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
            dot: "bg-emerald-500",
        };
    }

    if (normalized === "rejected") {
        return {
            badge: "bg-rose-50 text-rose-700 border-rose-200",
            dot: "bg-rose-500",
        };
    }

    return {
        badge: "bg-amber-50 text-amber-700 border-amber-200",
        dot: "bg-amber-500",
    };
};

const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    return new Intl.DateTimeFormat("en", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(date);
};

export default function NotificationCard({
    notification,
    onOpen,
    onDelete,
    isDeleting = false,
}: NotificationCardProps) {
    const statusStyles = getStatusStyles(notification.data.status);
    const isUnread = notification.read_at === null;

    return (
        <article className="group rounded-2xl border border-border bg-white p-4 shadow-[0_8px_25px_rgba(34,35,58,0.04)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_35px_rgba(34,35,58,0.08)] sm:p-5">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex min-w-0 flex-1 gap-4">
                    <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <span className="text-sm font-semibold">
                            {notification.data.title.slice(0, 2).toUpperCase()}
                        </span>

                        {isUnread ? (
                            <span className="absolute right-[-2px] top-[-2px] h-3 w-3 rounded-full border-2 border-white bg-primary" />
                        ) : null}
                    </div>

                    <div className="min-w-0 flex-1">
                        <div className="mb-2 flex flex-wrap items-center gap-2">
                            <h3 className="truncate text-[15px] font-semibold text-text-primary sm:text-[16px]">
                                {notification.data.title}
                            </h3>

                            <span
                                className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-[11px] font-medium ${statusStyles.badge}`}
                            >
                                <span className={`h-1.5 w-1.5 rounded-full ${statusStyles.dot}`} />
                                {notification.data.status}
                            </span>

                            {isUnread ? (
                                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-medium text-primary">
                                    unread
                                </span>
                            ) : null}
                        </div>

                        <p className="max-w-3xl text-[13px] leading-6 text-text-secondary sm:text-[14px]">
                            {notification.data.message}
                        </p>

                        <p className="mt-3 text-[12px] text-text-secondary/80">
                            {formatDate(notification.created_at)}
                        </p>
                    </div>
                </div>

                <div className="flex shrink-0 items-center gap-2 sm:self-center">
                    <button
                        type="button"
                        onClick={() => onOpen(notification)}
                        disabled={isDeleting}
                        className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-200 hover:bg-[#4f50df] disabled:cursor-not-allowed disabled:opacity-60"
                    >
                        <FiExternalLink className="text-base" />
                        Open
                    </button>

                    <button
                        type="button"
                        onClick={() => onDelete(notification.id)}
                        disabled={isDeleting}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-text-secondary transition-all duration-200 hover:border-rose-200 hover:text-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                        aria-label="Dismiss notification"
                    >
                        <FiTrash2 className="text-base" />
                    </button>
                </div>
            </div>
        </article>
    );
}