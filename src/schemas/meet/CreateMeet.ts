import { z } from "zod";

export const CreateMeetSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter a name")
    .max(50, "Name must not exceed 50 characters"),
  location: z
    .string()
    .max(100, "Location must not exceed 100 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  dates: z.date().array().min(1, "Please select at least one date"),
});

export type CreateMeet = z.infer<typeof CreateMeetSchema>;
