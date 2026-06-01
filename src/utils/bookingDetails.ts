export function readStringField(source: unknown, keys: string[]): string | null {
    if (!source || typeof source !== "object") {
        return null;
    }

    const record = source as Record<string, unknown>;

    for (const key of keys) {
        const value = record[key];

        if (typeof value === "string" && value.trim().length > 0) {
            return value.trim();
        }

        if (typeof value === "number" && Number.isFinite(value)) {
            return String(value);
        }
    }

    return null;
}

export function readImageField(source: unknown): string | null {
    if (!source || typeof source !== "object") {
        return null;
    }

    const record = source as Record<string, unknown>;

    const imageKeys = [
        "image",
        "thumbnail",
        "cover_image",
        "photo",
        "main_image",
        "image_url",
        "thumbnail_url",
        "url",
    ];

    for (const key of imageKeys) {
        const value = record[key];

        if (typeof value === "string" && value.trim().length > 0) {
            return value.trim();
        }
    }

    const images = record["images"];

    if (Array.isArray(images)) {
        for (const item of images) {
            if (typeof item === "string" && item.trim().length > 0) {
                return item.trim();
            }

            if (item && typeof item === "object") {
                const nested = readStringField(item, ["url", "path", "image", "src"]);

                if (nested) {
                    return nested;
                }
            }
        }
    }

    return null;
}