import { z } from "zod";

export const reviewSchema = z.object({
    rating: z.number().int().min(1, "Please choose a rating from 1 to 5.").max(5),
    comment: z
        .string()
        .trim()
        .min(2, "Comment must be at least 2 characters.")
        .max(500, "Comment must not exceed 500 characters."),
});

export type ReviewFormValues = z.infer<typeof reviewSchema>;