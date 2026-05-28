import { AxiosError } from "axios";

type LaravelValidationErrors = Record<string, string[] | string>;

interface LaravelErrorResponse {
    message?: string;
    errors?: LaravelValidationErrors;
}

const getFirstValidationError = (
    errors?: LaravelValidationErrors
): string | null => {
    if (!errors) return null;

    for (const value of Object.values(errors)) {
        if (Array.isArray(value) && value.length > 0) {
            return value[0];
        }

        if (typeof value === "string" && value.trim().length > 0) {
            return value;
        }
    }

    return null;
};

export const parseNotificationsError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data as LaravelErrorResponse | undefined;

        const validationMessage = getFirstValidationError(data?.errors);
        if (validationMessage) return validationMessage;

        if (data?.message) return data.message;

        if (status === 401) {
            return "You are not authorized to view notifications.";
        }

        if (status === 403) {
            return "You do not have permission to perform this action.";
        }

        if (status === 404) {
            return "Notification not found.";
        }

        if (error.code === "ERR_NETWORK") {
            return "Network error. Please check your connection.";
        }

        return "Something went wrong while loading notifications.";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unexpected error occurred.";
};