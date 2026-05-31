import axios from "axios";

type LaravelErrorResponse = {
    message?: string;
    errors?: Record<string, string[] | string>;
};

function normalizeErrorValues(errors: Record<string, string[] | string>): string[] {
    return Object.values(errors).flatMap((value) =>
        Array.isArray(value) ? value : [value]
    );
}

export function getBookingErrorMessage(error: unknown): string {
    const defaultMessage =
        "An unexpected error occurred while processing the booking request.";

    if (!axios.isAxiosError<LaravelErrorResponse>(error)) {
        return defaultMessage;
    }

    if (!error.response) {
        return "Unable to connect to the server. Please check your internet connection and try again.";
    }

    const status = error.response.status;

    if (status === 401) {
        return "Your session has expired. Please log in again.";
    }

    if (status === 403) {
        return "You do not have permission to perform this action.";
    }

    if (status === 404) {
        return "The requested booking could not be found.";
    }

    if (status >= 500) {
        return "A server error occurred. Please try again later.";
    }

    const responseData = error.response.data;

    if (responseData?.message && responseData.message !== "The given data was invalid.") {
        return responseData.message;
    }

    if (responseData?.errors) {
        const messages = normalizeErrorValues(responseData.errors);

        if (messages.length > 0) {
            return messages.join(" • ");
        }
    }

    if (responseData?.message) {
        return responseData.message;
    }

    return defaultMessage;
}