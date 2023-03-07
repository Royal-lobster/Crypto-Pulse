import type { NextApiRequest, NextApiResponse } from "next";
import { getPastDayData } from "~/modules/getPastDayStatistics";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const tokensToBeUpdated: { id: string }[] = await prisma.token.findMany({
    where: {
      updatedAt: {
        gte: new Date(new Date().getTime() - 24 * 60 * 60 * 1000),
      },
    },
    select: { id: true },
  });

  const tokenIds = tokensToBeUpdated.map((token) => token.id);
  const tokensUpdated = tokenIds.map(async (tokenId) => {
    const data = await getPastDayData(tokenId, "usd", 1);
    const { id } = await prisma.statistics.update({
      where: { tokenId },
      data: {
        dayHighestPrice: data.pastDayHighestPrice,
        dayLowestPrice: data.pastDayLowestPrice,
        dayVolume: data.pastDayTotalVolume,
      },
      select: { id: true },
    });
    return id;
  });
  res.status(200).json({ tokensToBeUpdated, tokensUpdated });
};

export default handler;
