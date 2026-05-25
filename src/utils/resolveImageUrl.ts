const STORAGE_BASE_URL =
    import.meta.env.VITE_STORAGE_URL ?? "http://127.0.0.1:8000/storage/";

export function resolveImageUrl(imagePath: string | null | undefined): string {
    if (!imagePath) return "";

    if (/^https?:\/\//i.test(imagePath)) {
        return imagePath;
    }

    const baseUrl = STORAGE_BASE_URL.replace(/\/+$/, "");
    const normalizedPath = imagePath.replace(/^\/+/, "");

    return `${baseUrl}/${normalizedPath}`;
}