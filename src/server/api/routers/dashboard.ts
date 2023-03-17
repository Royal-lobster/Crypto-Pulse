import { NewsModel, StatisticsModel } from "prisma/zod";
import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getDashboardData: protectedProcedure
    .output(
      z.object({
        news: z.array(NewsModel),
        statistics: z.array(StatisticsModel),
      })
    )
    .query(async ({ ctx }) => {
      const { userAddress } = ctx;

      // Find all token user subscribed to
      const tokens = await ctx.prisma.token.findMany({
        where: {
          users: {
            some: {
              id: userAddress,
            },
          },
        },
      });

      // Find all news related to those tokens
      const news = await ctx.prisma.news.findMany({
        where: {
          tokenId: {
            in: tokens.map((token) => token.id),
          },
        },
        include: {
          tokens: true,
        },
      });

      // Find all stats related to those tokens
      const statistics = await ctx.prisma.statistics.findMany({
        where: {
          tokenId: {
            in: tokens.map((token) => token.id),
          },
        },
      });

      return { news, statistics, tokens };
    }),
});
