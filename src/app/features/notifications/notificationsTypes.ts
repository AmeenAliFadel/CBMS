export interface NotificationData {
    type: string;
    title: string;
    message: string;
    status: string;
    url: string;
}

export interface AppNotification {
    id: string;
    type: string;
    notifiable_type: string;
    notifiable_id: number;
    data: NotificationData;
    read_at: string | null;
    created_at: string;
    updated_at: string;
}

export interface NotificationsApiResponse {
    notifications: AppNotification[];
}

export interface DeleteNotificationResponse {
    message: string;
}

export interface NotificationsState {
    items: AppNotification[];
    loading: boolean;
    deletingId: string | null;
    errorMessage: string | null;
}