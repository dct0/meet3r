import { GetUserSchema } from "~/schemas/user/GetUser";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const userRouter = createTRPCRouter({
  get: protectedProcedure.input(GetUserSchema).query(async ({ input, ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
});
