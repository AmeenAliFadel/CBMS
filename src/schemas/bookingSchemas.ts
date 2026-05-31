import { z } from "zod";
import { isValidBookingDate, parseBookingDate } from "../utils/date";

export const bookingFormSchema = z
    .object({
        startDate: z
            .string()
            .min(1, "Start date is required.")
            .refine(isValidBookingDate, "Start date is invalid."),
        endDate: z
            .string()
            .min(1, "End date is required.")
            .refine(isValidBookingDate, "End date is invalid."),
    })
    .refine(
        ({ startDate, endDate }) =>
            parseBookingDate(endDate) >= parseBookingDate(startDate),
        {
            message: "End date must be after start date.",
            path: ["endDate"],
        }
    );

export const createBookingRequestSchema = z
    .object({
        car_id: z.number().int().positive("Car is required."),
        start_date: z
            .string()
            .min(1, "Start date is required.")
            .refine(isValidBookingDate, "Start date is invalid."),
        end_date: z
            .string()
            .min(1, "End date is required.")
            .refine(isValidBookingDate, "End date is invalid."),
    })
    .refine(
        ({ start_date, end_date }) =>
            parseBookingDate(end_date) >= parseBookingDate(start_date),
        {
            message: "End date must be after start date.",
            path: ["end_date"],
        }
    );

export type BookingFormSchemaValues = z.infer<typeof bookingFormSchema>;
export type CreateBookingRequestSchemaValues = z.infer<
    typeof createBookingRequestSchema
>;