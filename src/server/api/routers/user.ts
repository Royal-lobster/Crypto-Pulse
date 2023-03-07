import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserHiIQValue } from "~/utils/getUserHiIQValue";
import { UserModel } from "prisma/zod";

export const userRouter = createTRPCRouter({
  registerUser: protectedProcedure
    .input(z.object({ tokenId: z.string() }))
    .output(z.void())
    .mutation(async ({ ctx }) => {
      const hiIQ = await getUserHiIQValue(ctx.userAddress);

      await ctx.prisma.user.upsert({
        where: { id: ctx.userAddress },
        update: {},
        create: { id: ctx.userAddress, hiIQ },
      });
    }),
  getUser: protectedProcedure
    .output(z.nullable(UserModel))
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userAddress },
      });

      return user;
    }),
});
