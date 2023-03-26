import type { NextApiRequest, NextApiResponse } from "next";
import { getPastDayStats } from "~/modules/getPastDayStatistics";
import { PrismaClient } from "@prisma/client";
import { getPastDayNews } from "~/modules/getPastDayNews";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const allTokens = await prisma.token.findMany({
    select: {
      ticker: true,
      id: true,
      lastRefresh: true,
      _count: { select: { news: true } },
    },
  });

  let tokensToBeRefreshed = allTokens.filter((t) => {
    const isUpdatedToday =
      t.lastRefresh &&
      new Date(t.lastRefresh).getDate() === new Date().getDate();
    return !isUpdatedToday || t._count.news === 0;
  });

  if (tokensToBeRefreshed.length === 0) {
    console.log("🎉 No tokens to be updated!");
    res.status(200).json({ message: "No tokens to be updated!" });
    return;
  }

  const toRunNext = tokensToBeRefreshed.length - 5 > 0;

  // take only 5 tokens to be refreshed
  tokensToBeRefreshed = tokensToBeRefreshed.slice(0, 5);

  const tokenTickers = tokensToBeRefreshed.map((token) => token.ticker);

  console.log(
    `\n📊 Fetching statistics data for ${tokenTickers.join(", ")}...\n`
  );

  const stats = await Promise.all(
    tokensToBeRefreshed.map(async (t) => await getPastDayStats(t.id, "usd", 1))
  );

  const news = await getPastDayNews(tokenTickers, 1);

  if (news && news.length > 0) {
    console.log("\n📼 Writing data to DB...");
    await prisma.$transaction([
      prisma.token.updateMany({
        where: { id: { in: tokensToBeRefreshed.map((t) => t.id) } },
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
          tokenId: tokensToBeRefreshed.find((t) => t.ticker === n.ticker)
            ?.id as string,
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
    console.log("🎉 Data written to DB Successfully!");

    console.log("\n🗑 Deleting old news...");
    const deletedNews = await prisma.news.deleteMany({
      where: {
        createdAt: {
          lte: new Date(new Date().getTime() - 2 * 24 * 60 * 60 * 1000),
        },
      },
    });
    console.log(`🎉 Deleted ${deletedNews.count} old news!`);

    if (toRunNext) {
      console.log("\n🔁 Running next cron job...");
      await fetch("/api/cron");
    }

    res.status(200).json({ success: true });
  }
  console.log("🚧 No news found! :( so cannot update DB!");
  res.status(500).json({ success: false, news, stats });
};

export default handler;
