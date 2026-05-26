import axios from "axios";

type LaravelErrorResponse = {
    message?: string;
    errors?: Record<string, string[] | string>;
};

export function getFavoritesErrorMessage(
    error: unknown,
    fallbackMessage = "Something went wrong"
): string {
    if (typeof error === "string") {
        return error;
    }

    if (axios.isAxiosError(error)) {
        const status = error.response?.status;
        const data = error.response?.data as LaravelErrorResponse | string | undefined;

        if (typeof data === "string" && data.trim()) {
            return data;
        }

        if (data && typeof data === "object") {
            if (data.errors) {
                const firstError = Object.values(data.errors)[0];

                if (Array.isArray(firstError) && firstError.length > 0) {
                    return firstError[0];
                }

                if (typeof firstError === "string" && firstError.trim()) {
                    return firstError;
                }
            }

            if (typeof data.message === "string" && data.message.trim()) {
                return data.message;
            }
        }

        if (error.code === "ERR_NETWORK") {
            return "Network error";
        }

        if (status === 401) {
            return "Unauthorized";
        }

        if (status === 403) {
            return "Forbidden";
        }

        if (status === 404) {
            return "Resource not found";
        }

        if (status && status >= 500) {
            return "Server error";
        }
    }

    if (error instanceof Error && error.message.trim()) {
        return error.message;
    }

    return fallbackMessage;
}