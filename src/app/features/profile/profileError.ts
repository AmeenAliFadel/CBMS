import axios from "axios";

type LaravelErrorResponse = {
  message?: string;
  errors?: Record<string, string[] | string>;
  error?: string;
};

const getFirstValidationMessage = (
  errors?: Record<string, string[] | string>
): string | null => {
  if (!errors) return null;

  for (const value of Object.values(errors)) {
    if (Array.isArray(value) && value.length > 0) return value[0];
    if (typeof value === "string" && value.trim()) return value;
  }

  return null;
};

export const getProfileErrorMessage = (
  error: unknown,
  fallback = "Failed to load profile"
): string => {
  if (axios.isAxiosError(error)) {
    if (!error.response) {
      return "Network error. Please check your connection.";
    }

    const status = error.response.status;
    const data = error.response.data as LaravelErrorResponse | string | undefined;

    if (status === 401) return "You are not authenticated.";
    if (status === 403) return "You do not have permission to view this profile.";
    if (status === 404) return "Profile not found.";
    if (status >= 500) return "Server error. Please try again later.";

    if (typeof data === "string") {
      return data;
    }

    const validationMessage =
      getFirstValidationMessage(data?.errors) ?? data?.message ?? data?.error;

    return validationMessage ?? fallback;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return fallback;
};