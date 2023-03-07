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

  removeToken: protectedProcedure
    .input(z.object({ tokenId: z.string() }))
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      const { tokenId } = input;

      await ctx.prisma.user.update({
        where: { id: ctx.userAddress },
        data: {
          tokens: {
            disconnect: { id: tokenId },
          },
        },
      });

      // Also remove token if it's not connected to any user
      // TODO: Can remove this to a cron job if it's too slow

      const tokenToDelete = await ctx.prisma.token.findUnique({
        where: { id: tokenId },
        select: { User: { select: { id: true } } },
      });

      if (!tokenToDelete?.User?.id) {
        await ctx.prisma.token.delete({ where: { id: tokenId } });
      }
    }),
});