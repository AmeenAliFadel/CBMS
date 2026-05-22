import { isAxiosError } from "axios";

type LaravelErrorResponse = {
    message?: string;
    errors?: Record<string, string[] | string>;
};

export function getAuthErrorMessage(
    error: unknown,
    fallback: string
): string {
    if (isAxiosError(error)) {
        const data = error.response?.data as LaravelErrorResponse | undefined;

        if (data?.errors) {
            const firstError = Object.values(data.errors)[0];

            if (Array.isArray(firstError)) {
                return firstError[0] || data.message || fallback;
            }

            if (typeof firstError === "string") {
                return firstError || data.message || fallback;
            }
        }

        return data?.message || fallback;
    }

    return fallback;
}