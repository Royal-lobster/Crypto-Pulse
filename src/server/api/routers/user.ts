import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserHiIQValue } from "~/utils/getUserHiIQValue";
import { TokenModel, UserModel } from "prisma/zod";

export const userRouter = createTRPCRouter({
  registerUser: protectedProcedure
    .output(UserModel.extend({ tokens: z.array(TokenModel) }))
    .mutation(async ({ ctx }) => {
      const { userAddress } = ctx;
      const hiIQ = (await getUserHiIQValue(userAddress)) || 0;

      const user = await ctx.prisma.user.upsert({
        where: { id: userAddress },
        update: {},
        create: { id: userAddress, hiIQ },
        include: {
          tokens: true,
        },
      });

      return user;
    }),
  getUser: protectedProcedure
    .output(z.nullable(UserModel))
    .query(async ({ ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userAddress },
        include: { tokens: true },
      });
      return user;
    }),
});
