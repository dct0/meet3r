import { CreateMeetSchema } from "~/schemas/meet/CreateMeet";
import { GetMeetSchema } from "~/schemas/meet/GetMeet";
import type { ListMeets } from "~/schemas/meet/ListMeets";
import { ListMeetsSchema } from "~/schemas/meet/ListMeets";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";
import type { PrismaClient } from "@prisma/client";
import type { Session } from "next-auth";

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
  list: protectedProcedure
    .input(ListMeetsSchema)
    .query(async ({ input, ctx }) => {
      return await listMeetsWithProfile(ctx.prisma, ctx.session, input);
    }),
});

export const listMeetsWithProfile = async (
  prisma: PrismaClient,
  session: Session,
  input: ListMeets
) => {
  return await prisma.meet.findMany({
    where: { createdBy: { id: session.user.id } },
    include: {
      createdBy: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    take: input.limit,
    skip: (input.page - 1) * input.limit,
  });
};
