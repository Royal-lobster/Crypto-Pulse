import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserHiIQValue } from "~/utils/getUserHiIQValue";
import { UserModel } from "prisma/zod";

export const userRouter = createTRPCRouter({
  registerUser: protectedProcedure
    .output(z.void())
    .mutation(async ({ ctx }) => {
      const { userAddress } = ctx;
      const hiIQ = (await getUserHiIQValue(userAddress)) || 0;

      if (userAddress)
        await ctx.prisma.user.upsert({
          where: { id: userAddress },
          update: {},
          create: { id: userAddress, hiIQ },
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
