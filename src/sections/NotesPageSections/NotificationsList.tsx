import NotificationCard from "../../components/notifications/NotificationCard";
import type { AppNotification } from "../../app/features/notifications/notificationsTypes";

interface Props {
    items: AppNotification[];
    deletingId: string | null;
    onOpen: (notification: AppNotification) => void;
    onDelete: (id: string) => void;
}

const NotificationsList = ({
    items,
    deletingId,
    onOpen,
    onDelete,
}: Props) => {
    return (
        <div className="grid gap-4">
            {items.map((notification) => (
                <NotificationCard
                    key={notification.id}
                    notification={notification}
                    isDeleting={deletingId === notification.id}
                    onOpen={onOpen}
                    onDelete={onDelete}
                />
            ))}
        </div>
    );
};

export default NotificationsList;