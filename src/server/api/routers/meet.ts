import { CreateMeetSchema } from "~/schemas/forms/CreateMeet";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const meetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateMeetSchema)
    .mutation(({ input, ctx }) => {
      return ctx.prisma.meet.create({
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
});
