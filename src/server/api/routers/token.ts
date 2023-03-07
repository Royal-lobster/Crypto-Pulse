import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tokenRouter = createTRPCRouter({
  addToken: protectedProcedure
    .input(z.object({ tokenId: z.string() }))
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      const { tokenId } = input;

      const token = await ctx.prisma.token.upsert({
        where: { id: tokenId },
        update: {},
        create: { id: tokenId },
      });

      await ctx.prisma.user.update({
        where: { id: ctx.userAddress },
        data: {
          tokens: {
            connect: { id: token.id },
          },
        },
      });
    }),
});
