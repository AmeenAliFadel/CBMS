import { z } from "zod";

export const updateProfileSchema = z.object({
  first_name: z.string().min(2, "First name is required"),
  last_name: z.string().optional().or(z.literal("")),
  bio: z.string().optional().or(z.literal("")),
  address: z.string().optional().or(z.literal("")),
  country: z.string().optional().or(z.literal("")),
  city: z.string().optional().or(z.literal("")),
  gender: z.string().optional().or(z.literal("")),
  birth_date: z.string().optional().or(z.literal("")),
  phone: z.string().optional().or(z.literal("")),
});

export type UpdateProfileFormValues = z.infer<
  typeof updateProfileSchema
>;