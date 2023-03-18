import type { NextApiRequest, NextApiResponse } from "next";
import { getPastDayStats } from "~/modules/getPastDayStatistics";
import { PrismaClient } from "@prisma/client";
import { getPastDayNews } from "~/modules/getPastDayNews";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokensToBeUpdated = await prisma.token.findMany({
    where: {
      OR: [
        {
          lastRefresh: {
            lte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
          },
        },
        { lastRefresh: null },
      ],
    },
    select: { ticker: true, id: true },
  });

  if (tokensToBeUpdated.length === 0) {
    console.log("🎉 No tokens to be updated!");
    res.status(200).json({ message: "No tokens to be updated!" });
    return;
  }

  const tokenIds = tokensToBeUpdated.map((token) => token.id);
  const tokenTickers = tokensToBeUpdated.map((token) => token.ticker);

  console.log(
    `\n📊 Fetching statistics data for ${tokenTickers.join(", ")}...\n`
  );
  const statisticsData = await Promise.all(
    tokenIds.map(async (tokenId) => {
      return await getPastDayStats(tokenId, "usd", 1);
    })
  );

  const newsData = await getPastDayNews(tokenTickers, 1);

  console.log("📼 Writing data to DB...");
  if (newsData && newsData.length > 0) {
    const result = await prisma.$transaction([
      ...statisticsData.map((statistic) =>
        prisma.statistics.upsert({
          where: { id: statistic.coinId },
          update: {
            id: statistic.coinId,
            dayHighestPrice: statistic.pastDayHighestPrice,
            dayLowestPrice: statistic.pastDayLowestPrice,
            dayVolume: statistic.pastDayTotalVolume,
            tokenId: statistic.coinId,
          },
          create: {
            id: statistic.coinId,
            dayHighestPrice: statistic.pastDayHighestPrice,
            dayLowestPrice: statistic.pastDayLowestPrice,
            dayVolume: statistic.pastDayTotalVolume,
            tokenId: statistic.coinId,
          },
        })
      ),
      ...newsData.map((news) =>
        prisma.news.upsert({
          where: { id: news.url },
          update: {},
          create: {
            title: news.title,
            rawContent: news.rawContent,
            image: news.image || "",
            createdAt: news.createdAt,
            id: news.url,
            tokens: {
              connect: { ticker: news.ticker },
            },
          },
        })
      ),
      prisma.token.updateMany({
        where: { id: { in: tokenIds } },
        data: { lastRefresh: new Date() },
      }),
    ]);
    console.log("🎉 Data written to DB Successfully!");
    res.status(200).json(result);
  }
};

export default handler;
