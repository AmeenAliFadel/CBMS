import { api } from "../../../services/axios";
import type {
    AppNotification,
    DeleteNotificationResponse,
    NotificationsApiResponse,
} from "./notificationsTypes";

export const fetchNotifications = async (): Promise<AppNotification[]> => {
    const { data } = await api.get<NotificationsApiResponse>("/v1/notifications");
    return data.notifications;
};

export const deleteNotification = async (
    notificationId: string
): Promise<DeleteNotificationResponse> => {
    const { data } = await api.delete<DeleteNotificationResponse>(
        `/v1/notifications/${notificationId}`
    );

    return data;
};