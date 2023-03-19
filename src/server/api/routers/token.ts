import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const tokenRouter = createTRPCRouter({
  addToken: protectedProcedure
    .input(
      z.object({
        tokenId: z.string(),
        tokenName: z.string(),
        tickerId: z.string(),
        tokenImg: z.string().url(),
      })
    )
    .output(z.void())
    .mutation(async ({ input, ctx }) => {
      const { tokenId, tickerId, tokenImg, tokenName } = input;

      // ================================
      // Check if user has enough HiIQ to add more tokens
      // ================================

      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.userAddress },
        select: {
          hiIQ: true,
          _count: {
            select: {
              tokens: true,
            },
          },
        },
      });

      // 3 tokens - free
      // 5 tokens - greater than 10000 HiIQ
      // 10 tokens - greater than 500000 HiIQ
      // 50 tokens - greater than 1000000 HiIQ

      const userHiIQ = user?.hiIQ || 0;
      const userTokenCount = user?._count?.tokens || 0;
      const nextUserTokenCount = userTokenCount + 1;

      if (nextUserTokenCount > 3) {
        if (nextUserTokenCount > 5 && userHiIQ < 10000) {
          throw new Error("Not enough HiIQ");
        }
        if (nextUserTokenCount > 10 && userHiIQ < 500000) {
          throw new Error("Not enough HiIQ");
        }
        if (nextUserTokenCount > 50 && userHiIQ < 1000000) {
          throw new Error("Not enough HiIQ");
        }
      }

      // ================================
      // Add token to user
      // ================================
      const token = await ctx.prisma.token.upsert({
        where: { id: tokenId },
        update: {},
        create: {
          id: tokenId,
          ticker: tickerId,
          image: tokenImg,
          name: tokenName,
        },
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
    }),
});
