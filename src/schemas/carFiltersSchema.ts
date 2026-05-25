import { z } from "zod";
import { CAR_TYPE_VALUES } from "../app/features/cars/carsTypes";

export const carFiltersSchema = z.object({
    carType: z.enum(["", ...CAR_TYPE_VALUES]),

    model: z
        .string()
        .trim()
        .max(100, "Model must be less than 100 characters"),

    maxPrice: z
        .number()
        .min(150, "Minimum price is 150")
        .max(2500, "Maximum price is 2500"),
});

export type CarFiltersFormValues = z.infer<typeof carFiltersSchema>;