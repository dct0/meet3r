import { z } from "zod";

export const ListMeetsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(20),
});

export type ListMeets = z.infer<typeof ListMeetsSchema>;
