import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { getBananaSummary } from "~/modules/getBananaSummary";
import { getPastDayNews } from "~/modules/getPastDayNews";
import { getPastDayStats } from "~/modules/getPastDayStatistics";

import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc";

export const dashboardRouter = createTRPCRouter({
  getUserSubscribedTokens: protectedProcedure.query(async ({ ctx }) => {
    const { userAddress, prisma } = ctx;

    const user = await prisma.user.findUnique({
      where: { id: userAddress },
      include: {
        tokens: {
          include: {
            news: true,
            Statistics: true,
          },
        },
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found. please logout and login again",
      });

    return user?.tokens;
  }),

  getNewsAndStatistics: protectedProcedure
    .input(z.object({ tokenId: z.string() }))
    .query(async ({ ctx, input }) => {
      const { tokenId } = input;
      const { prisma, userAddress } = ctx;

      // ======================
      // check if token is subscribed by user
      // ======================
      const token = (
        await prisma.user.findUnique({
          where: { id: userAddress },
          select: {
            tokens: {
              where: { id: tokenId },
              include: {
                news: true,
                Statistics: true,
              },
            },
          },
        })
      )?.tokens[0];

      if (!token)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not subscribed to token",
        });

      // ======================
      // check if last refresh was less than 24 hours ago
      // ======================

      const lastRefresh = token.lastRefresh;
      const now = new Date();

      if (lastRefresh && now.getTime() - lastRefresh.getTime() <= 86400000) {
        return token;
      }

      // ======================
      // fetch news and statistics
      // ======================

      const stats = await getPastDayStats(token.id, "usd", 1);
      const news = (await getPastDayNews([token.ticker], 1))[0];

      if (!news)
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Error fetching news",
        });

      const updatedToken = await prisma.token.update({
        where: { id: token.id },
        data: {
          lastRefresh: new Date(),
          news: {
            create: {
              title: news.title,
              description: news.description,
              image: news.image,
              rawContent: news.rawContent,
              id: news.url,
              createdAt: news.createdAt,
            },
          },
          Statistics: {
            create: {
              dayHighestPrice: stats.pastDayHighestPrice,
              dayLowestPrice: stats.pastDayLowestPrice,
              dayVolume: stats.pastDayTotalVolume,
              id: stats.coinId,
            },
          },
        },
        include: {
          news: true,
          Statistics: true,
        },
      });

      return updatedToken;
    }),

  getCondensedNews: protectedProcedure
    .input(z.object({ newsId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { newsId } = input;
      const { prisma, userAddress } = ctx;

      // ======================
      // check if news exists
      // ======================

      const news = await prisma.news.findUnique({
        where: { id: newsId },
      });

      if (!news)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "News not found",
        });

      if (news.content) return news.content;
      if (!news.rawContent)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "News has no raw content",
        });

      // ======================
      // check if token is subscribed by user
      // ======================
      const tokenId = (
        await prisma.news.findUnique({
          where: { id: newsId },
          select: { tokenId: true },
        })
      )?.tokenId;

      const token = (
        await prisma.user.findUnique({
          where: { id: userAddress },
          select: { tokens: { where: { id: tokenId } } },
        })
      )?.tokens[0];

      if (!token)
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "User not subscribed to token",
        });

      // ======================
      // get summary
      // ======================

      const content = await getBananaSummary(news.rawContent);

      const updatedNews = await prisma.news.update({
        where: { id: newsId },
        data: {
          content,
        },
      });

      return updatedNews.content;
    }),
});
