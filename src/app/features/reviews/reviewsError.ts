import axios from "axios";

type LaravelValidationErrors = Record<
    string,
    string[] | string
>;

interface LaravelErrorResponse {
    message?: string;
    errors?: LaravelValidationErrors;
}

function getFirstValidationMessage(
    errors?: LaravelValidationErrors
): string | null {
    if (!errors) {
        return null;
    }

    for (const value of Object.values(errors)) {
        if (Array.isArray(value) && value.length > 0) {
            return value[0];
        }

        if (
            typeof value === "string" &&
            value.trim()
        ) {
            return value;
        }
    }

    return null;
}

function isLaravelErrorResponse(
    value: unknown
): value is LaravelErrorResponse {
    return (
        typeof value === "object" &&
        value !== null
    );
}

export function parseReviewsError(
    error: unknown
): string {
    const fallbackMessage =
        "Something went wrong while processing reviews.";

    if (!axios.isAxiosError(error)) {
        return fallbackMessage;
    }

    if (!error.response) {
        return "Network error. Please check your internet connection.";
    }

    const responseData = error.response.data;

    if (
        typeof responseData === "string" &&
        responseData.trim()
    ) {
        return responseData;
    }

    if (isLaravelErrorResponse(responseData)) {
        const validationMessage =
            getFirstValidationMessage(
                responseData.errors
            );

        if (validationMessage) {
            return validationMessage;
        }

        if (
            responseData.message &&
            responseData.message.trim()
        ) {
            return responseData.message;
        }
    }

    switch (error.response.status) {
        case 401:
            return "You must be logged in to perform this action.";

        case 403:
            return "You are not authorized to perform this action.";

        case 404:
            return "Requested resource was not found.";

        case 422:
            return "Validation failed.";

        case 429:
            return "Too many requests. Please try again later.";

        default:
            if (error.response.status >= 500) {
                return "Server error. Please try again later.";
            }

            return fallbackMessage;
    }
}