import type { NextApiRequest, NextApiResponse } from "next";
import { getPastDayData } from "~/modules/getPastDayStatistics";
import { PrismaClient } from "@prisma/client";
import { getPastDayNews } from "~/modules/getPastDayNews";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokensToBeUpdated = await prisma.token.findMany({
    where: {
      updatedAt: {
        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    },
    select: { ticker: true, id: true },
  });

  const tokenIds = tokensToBeUpdated.map((token) => token.id);
  const tokenTickers = tokensToBeUpdated.map((token) => token.ticker as string);

  console.log("🪵 Tokens to be updated: ", tokenTickers);

  const tokensUpdated = await Promise.all(
    tokenIds.map(async (tokenId) => {
      const statsData = await getPastDayData(tokenId, "usd", 1);
      console.log("🪵 Stats data: ", statsData);
      const { id } = await prisma.statistics.upsert({
        where: { tokenId },
        update: {},
        create: {
          tokenId,
          id: tokenId,
          dayHighestPrice: statsData.pastDayHighestPrice,
          dayLowestPrice: statsData.pastDayLowestPrice,
          dayVolume: statsData.pastDayTotalVolume,
        },
      });
      return id;
    })
  );

  console.log("🪵 Tokens updated: ", tokensUpdated);

  const newsData = await getPastDayNews(tokenTickers, 1);

  if (newsData && newsData.length > 0) {
    await prisma.$transaction(
      newsData.map((news) =>
        prisma.news.upsert({
          where: { id: news.url },
          update: {},
          create: {
            title: news.title,
            content: news.content || "",
            image: news.image || "",
            createdAt: news.createdAt,
            id: news.url,
            tokens: {
              connect: news.coinIds?.map((coinId) => ({ id: coinId })),
            },
          },
        })
      )
    );
  }

  res.status(200).json({ tokensToBeUpdated, tokensUpdated, newsData });
};

export default handler;
