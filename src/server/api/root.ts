import { createTRPCRouter } from "~/server/api/trpc";
import { meetRouter } from "./routers/meet";
import { userRouter } from "./routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  user: userRouter,
  meet: meetRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
