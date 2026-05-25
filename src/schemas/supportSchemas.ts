import { z } from "zod";

export const supportSubjectOptions = [
    "General Inquiry",
    "Fleet Rental",
    "Corporate Services",
    "Partnership",
    "Support",
] as const;

export const supportSchema = z.object({
    name: z
        .string()
        .trim()
        .min(2, "Full name is required"),

    email: z
        .string()
        .trim()
        .min(1, "Email is required")
        .email("Please enter a valid email address"),

    phone: z
        .string()
        .trim()
        .min(1, "Phone number is required")
        .regex(
            /^[0-9+()\s-]{7,20}$/,
            "Please enter a valid phone number"
        ),

    subject: z.enum(supportSubjectOptions, {
        message: "Please select a subject",
    }),

    message: z
        .string()
        .trim()
        .min(10, "Message must be at least 10 characters"),
});

export type SupportFormValues = z.infer<typeof supportSchema>;