import type { NextApiRequest, NextApiResponse } from "next";
import { getPastDayStats } from "~/modules/getPastDayStatistics";
import { PrismaClient } from "@prisma/client";
import { getPastDayNews } from "~/modules/getPastDayNews";
import { getBaseUrl } from "~/utils/api";

const prisma = new PrismaClient();
const TOKEN_SET_SIZE = 4; // TO AVOID EXCEEDING SERVERLESS FUNCTION TIME LIMIT

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  // ==============================
  // FETCH TOKENS TO BE REFRESHED
  // ==============================
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

    console.log(`
      ${t.ticker} - ${t.id} - ${t._count.news} - ${isUpdatedToday ? "✅" : "❌"}
    `);
    return !isUpdatedToday || t._count.news === 0;
  });

  if (tokensToBeRefreshed.length === 0) {
    console.log("🎉 No tokens to be updated!");
    res.status(200).json({ message: "No tokens to be updated!" });
    return;
  }

  const toRunNext = tokensToBeRefreshed.length - TOKEN_SET_SIZE > 0;
  tokensToBeRefreshed = tokensToBeRefreshed.slice(0, TOKEN_SET_SIZE);

  // ==============================
  // FETCH STATS AND NEWS
  // ==============================

  const tokenTickers = tokensToBeRefreshed.map((token) => token.ticker);

  console.log(`\n📊 Fetching data for ${tokenTickers.join(", ")}...\n`);

  const stats = await Promise.all(
    tokensToBeRefreshed.map(async (t) => await getPastDayStats(t.id, "usd", 1))
  );

  const news = await getPastDayNews(tokenTickers, 1);

  // ==============================
  // WRITE DATA TO DB
  // ==============================

  if (news && news.length > 0) {
    console.log("\n📼 Writing data to DB...");
    const result = await prisma.$transaction([
      prisma.token.updateMany({
        where: { id: { in: tokensToBeRefreshed.map((t) => t.id) } },
        data: {
          lastRefresh: new Date(),
        },
      }),
      prisma.news.createMany({
        skipDuplicates: true,
        data: news.map((n) => ({
          id: `${n.url}?${n.ticker}`,
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

    console.log(result);

    console.log("🎉 Data written to DB Successfully!");

    // ==============================
    // TRIGGER NEXT CRON JOB
    // ==============================
    if (toRunNext) {
      console.log("\n🔁 Running next cron job...");
      await fetch(`${getBaseUrl()}/api/cache-cron`);
    }

    res.status(200).json({ success: true });
  } else {
    console.log("🚧 No news found! :( so cannot update DB!");
    res.status(500).json({ success: false, news, stats });
  }
};

export default handler;
