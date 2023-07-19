import { z } from "zod";

export const GetMeetSchema = z.object({
  id: z.string().cuid(),
});

export type GetMeet = z.infer<typeof GetMeetSchema>;
