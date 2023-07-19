import { CreateMeetSchema } from "~/schemas/meet/CreateMeet";
import { GetMeetSchema } from "~/schemas/meet/GetMeet";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const meetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateMeetSchema)
    .mutation(async ({ input, ctx }) => {
      return await ctx.prisma.meet.create({
        data: {
          name: input.name,
          location: input.location,
          description: input.description,
          allowedDates: input.dates,
          createdBy: {
            connect: {
              id: ctx.session.user.id,
            },
          },
        },
      });
    }),
  get: protectedProcedure.input(GetMeetSchema).query(async ({ input, ctx }) => {
    return await ctx.prisma.meet.findUnique({
      where: {
        id: input.id,
      },
    });
  }),
});
