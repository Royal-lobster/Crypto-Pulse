import { type Token } from "@prisma/client";
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
        tokens: true,
      },
    });

    if (!user)
      throw new TRPCError({
        code: "NOT_FOUND",
        message: "User not found. please logout and login again",
      });

    return user?.tokens;
  }),

  getNewsAndStatistics: protectedProcedure.query(async ({ ctx }) => {
    const { prisma, userAddress } = ctx;

    // ======================
    // get all tokens subscribed by user
    // ======================
    const tokens = (
      await prisma.user.findUnique({
        where: { id: userAddress },
        select: {
          tokens: {
            include: {
              news: true,
              Statistics: true,
            },
          },
        },
      })
    )?.tokens;

    if (!tokens)
      throw new TRPCError({
        code: "BAD_REQUEST",
        message: "User not subscribed to token",
      });

    // ======================
    // check if last refresh was less than 24 hours ago
    // ======================

    const tokensToBeRefreshed: Token[] = [];

    for (const t of tokens) {
      const now = new Date();
      const isToday =
        t.lastRefresh && new Date(t.lastRefresh).getDate() === now.getDate();
      if (!t.lastRefresh || !isToday) {
        console.log(
          `🔁 | ${t.ticker} last refresh was ${
            t.lastRefresh ? t.lastRefresh.toLocaleDateString() : "never"
          } so refreshing now`
        );
        tokensToBeRefreshed.push(t);
      }
    }

    if (tokensToBeRefreshed.length === 0) return tokens;

    // ======================
    // fetch news and statistics
    // ======================

    const stats = await Promise.all(
      tokensToBeRefreshed.map(
        async (t) => await getPastDayStats(t.id, "usd", 1)
      )
    );
    const news = await getPastDayNews(
      tokensToBeRefreshed.map((t) => t.ticker),
      1
    );

    if (!news)
      throw new TRPCError({
        code: "INTERNAL_SERVER_ERROR",
        message: "Error fetching news",
      });

    await prisma.$transaction([
      prisma.token.updateMany({
        where: { id: { in: tokens.map((t) => t.id) } },
        data: {
          lastRefresh: new Date(),
        },
      }),
      prisma.news.createMany({
        skipDuplicates: true,
        data: news.map((n) => ({
          id: n.url,
          createdAt: new Date(n.createdAt),
          title: n.title,
          rawContent: n.rawContent,
          description: n.description,
          image: n.image,
          tokenId: tokens.find((t) => t.ticker === n.ticker)?.id as string,
        })),
      }),
      prisma.statistics.deleteMany({
        where: { tokenId: { in: stats.map((t) => t.coinId) } },
      }),
      prisma.statistics.createMany({
        skipDuplicates: true,
        data: stats.map((s) => ({
          id: s.coinId,
          dayHighestPrice: s.pastDayHighestPrice,
          dayLowestPrice: s.pastDayLowestPrice,
          dayVolume: s.pastDayTotalVolume,
          tokenId: s.coinId,
        })),
      }),
    ]);

    const updatedTokens = (
      await prisma.user.findUnique({
        where: { id: userAddress },
        select: {
          tokens: {
            include: {
              news: true,
              Statistics: true,
            },
          },
        },
      })
    )?.tokens;

    return updatedTokens;
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
