import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const deletedNews = await prisma.news.deleteMany({
    where: {
      createdAt: {
        lte: new Date(new Date().getTime() - 1 * 24 * 60 * 60 * 1000),
      },
    },
  });
  console.log(`🎉 Deleted ${deletedNews.count} old news!`);

  res.status(200).json({ deletedNews });
};

export default handler;
