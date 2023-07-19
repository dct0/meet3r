import { z } from "zod";

export const GetUserSchema = z.object({
  id: z.string().cuid(),
});

export type GetUser = z.infer<typeof GetUserSchema>;
