import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png"];

const imageSchema = z
    .instanceof(File, {
        message: "Image file is required.",
    })
    .optional()
    .refine((file) => file instanceof File, {
        message: "Image file is required.",
    })
    .refine((file) => !file || ALLOWED_IMAGE_TYPES.includes(file.type), {
        message: "The image must be a file of type: jpg, jpeg, png.",
    })
    .refine((file) => !file || file.size <= MAX_FILE_SIZE, {
        message: "The image size must be less than 5MB.",
    });

export const lessorRequestSchema = z.object({
    business_name: z
        .string()
        .min(2, "Business name must be at least 2 characters.")
        .max(100, "Business name must not exceed 100 characters."),
    phone: z
        .string()
        .min(7, "Phone number is required.")
        .max(20, "Phone number is too long."),
    message: z
        .string()
        .min(10, "Message must be at least 10 characters.")
        .max(1000, "Message must not exceed 1000 characters."),
    identity_front_image: imageSchema,
    identity_back_image: imageSchema,
});

export type LessorRequestSchemaValues = z.infer<typeof lessorRequestSchema>;