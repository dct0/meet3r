import { z } from "zod";

export const SafeUserSchema = z.object({
  id: z.string().cuid(),
  name: z.string().nullable(),
  image: z.string().url().nullable(),
});

export type SafeUser = z.infer<typeof SafeUserSchema>;
