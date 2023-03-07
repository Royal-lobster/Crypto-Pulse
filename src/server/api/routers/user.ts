import { z } from "zod";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { getUserHiIQValue } from "~/utils/getUserHiIQValue";

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
});
