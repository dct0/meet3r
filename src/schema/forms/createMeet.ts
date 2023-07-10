import { z } from "zod";

export const formSchema = z.object({
  name: z
    .string()
    .min(1, "Please enter a name")
    .max(50, "Name must not exceed 50 characters"),
  description: z
    .string()
    .min(1)
    .max(500, "Description must not exceed 500 characters")
    .optional(),
  dates: z.date().array(),
});

export type FormValues = z.infer<typeof formSchema>;
