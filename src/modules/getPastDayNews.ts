import axios, { type AxiosResponse } from "axios";
import { type ResponseData as CryptoPanicResponseData } from "~/types/cryptopanic";
import { type ResponseData as BananaResponseData } from "~/types/banana";
import { extract } from "@extractus/article-extractor";
import banana from "@banana-dev/banana-dev";
import { env } from "~/env.mjs";

export const getPastDayNews = async (coinIds: string[], days: number) => {
  const coinIdsString = coinIds.join(",");

  const response: AxiosResponse<CryptoPanicResponseData> = await axios.get(
    `https://cryptopanic.com/api/v1/posts/?auth_token=${env.CRYPTOPANIC_API_KEY}&currencies=${coinIdsString}&public=true&filter=hot&period=${days}d&kind=news`
  );

  if (!response.data.results) return;

  const articles = [];

  for (const result of response.data.results) {
    const article = await extract(result.url);

    const out = (await banana.run(env.BANANA_API_KEY, env.BANANA_MODEL_KEY, {
      prompt: article.content,
    })) as BananaResponseData;

    articles.push({
      coinIds: result.currencies?.map((c) => c.code),
      title: result.title,
      url: result.url,
      content: out.modelOutputs[0] && out.modelOutputs[0][0]?.summary_text,
      scrappedDescription: article.description,
      image: article.image,
      createdAt: result.created_at,
    });
  }

  return articles;
};
