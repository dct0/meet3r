import { z } from "zod";
import type { listMeetsWithProfile } from "~/server/api/routers/meet";
import { Prisma } from "@prisma/client";
import PromiseReturnType = Prisma.PromiseReturnType;

export const ListMeetsSchema = z.object({
  page: z.number().int().positive().default(1),
  limit: z.number().int().positive().default(20),
});

export type ListMeets = z.infer<typeof ListMeetsSchema>;

export type MeetsWithProfile = PromiseReturnType<typeof listMeetsWithProfile>;
