import axios, { type AxiosResponse } from "axios";
import { type ResponseData as CryptoPanicResponseData } from "~/types/cryptopanic";
import { type ResponseData as BananaResponseData } from "~/types/banana";
import { extract } from "@extractus/article-extractor";
import { env } from "~/env.mjs";

export const getPastDayNews = async (coinTickers: string[], days: number) => {
  const coinIdsString = coinTickers.join(",");

  const newsRes: AxiosResponse<CryptoPanicResponseData> = await axios.get(
    `https://cryptopanic.com/api/v1/posts/?auth_token=${env.CRYPTOPANIC_API_KEY}&currencies=${coinIdsString}&public=true&filter=hot&period=${days}d&kind=news`
  );

  if (!newsRes.data.results) return;

  const articles = [];

  for (const result of newsRes.data.results) {
    try {
      const url = result.url.replace(
        /https:\/\/cryptopanic\.com\/news\/(\d+)\/.*/,
        "https://cryptopanic.com/news/click/$1/"
      );

      const scrapperRes = await extract(url);

      console.log("\n\n✨ Generating for: ", scrapperRes.title);
      console.log("📰 GOT ARTICLE: ", scrapperRes.content);

      console.time("⏱️ Summary generation");
      const AIRes: AxiosResponse<BananaResponseData> = await axios.post(
        "https://api.banana.dev/start/v4/",
        {
          apiKey: env.BANANA_API_KEY,
          modelKey: env.BANANA_MODEL_KEY,
          modelInputs: {
            prompt: scrapperRes.content,
          },
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.timeEnd("⏱️ Summary generation");

      const aiGeneratedContent =
        AIRes.data.modelOutputs &&
        AIRes.data.modelOutputs[0] &&
        AIRes.data.modelOutputs[0][0]?.summary_text;

      if (aiGeneratedContent)
        console.log("🪵 GOT AI CONTENT: ", aiGeneratedContent);
      else {
        console.log("❌ Failed to generate summary", AIRes.data);
      }

      articles.push({
        coinIds: result.currencies?.map((c) => c.code),
        title: result.title,
        url: result.url,
        content: aiGeneratedContent || scrapperRes.description,
        image: scrapperRes.image,
        createdAt: result.created_at,
      });
    } catch (e) {
      console.log("🚨 ERROR: ", e);
    }
  }

  return articles;
};
