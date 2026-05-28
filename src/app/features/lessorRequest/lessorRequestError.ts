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

        if (typeof value === "string" && value.trim()) {
            return value;
        }
    }

    return null;
};

export const parseLessorRequestError = (error: unknown): string => {
    if (error instanceof AxiosError) {
        const status = error.response?.status;
        const data = error.response?.data as LaravelErrorResponse | undefined;

        const validationMessage = getFirstValidationError(data?.errors);
        if (validationMessage) return validationMessage;

        if (data?.message) return data.message;

        if (status === 401) {
            return "You are not authorized to perform this action.";
        }

        if (status === 422) {
            return "The submitted data is invalid.";
        }

        if (error.code === "ERR_NETWORK") {
            return "Network error. Please check your internet connection.";
        }

        return "Something went wrong while submitting the request.";
    }

    if (error instanceof Error) {
        return error.message;
    }

    return "An unexpected error occurred.";
};