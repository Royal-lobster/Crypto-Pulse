import { extractFromHtml } from "@extractus/article-extractor";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import { type ResponseData as CryptoPanicResponseData } from "~/types/cryptopanic";
import { isYesterdayRelativeTo } from "~/utils/isYesterdayRelativeTo";

export const getPastDayNews = async (coinTickers: string[], days: number) => {
  console.log(`\n🏬 Fetching news for ${coinTickers.join(", ")}...`);
  const fetchedNewsArticles = await fetchCryptoPanicArticles(coinTickers, days);
  console.log(`\n🦾 Scrapping news from the fetched articles...`);
  const scrappedArticles = await getScrappedArticles(
    coinTickers,
    fetchedNewsArticles
  );
  return scrappedArticles;
};

const fetchCryptoPanicArticles = async (
  coinTickers: string[],
  days: number
) => {
  const fetchedNewsArticles = new Map<
    string,
    CryptoPanicResponseData["results"]
  >();
  for (const ticker of coinTickers) {
    try {
      const newsRes: AxiosResponse<CryptoPanicResponseData> = await axios.get(
        `https://cryptopanic.com/api/v1/posts/?auth_token=${env.CRYPTOPANIC_API_KEY}&currencies=${ticker}&public=true&period=${days}d&kind=news`
      );
      const data = newsRes.data.results;

      const topNews = data
        ?.filter(
          (result) =>
            isYesterdayRelativeTo(new Date(result.published_at), new Date()) ||
            isYesterdayRelativeTo(new Date(result.created_at), new Date())
        )
        .slice(0, 10);
      fetchedNewsArticles.set(ticker, topNews);
      console.log(
        `🌴 | cryptopanic fetch success for ${ticker} with ${
          topNews?.length || 0
        } results`
      );
    } catch (e) {
      const msg = e as { message: string };
      console.error(`❌ cryptopanic fetch fail for ${ticker}`, msg);
    }
  }
  return fetchedNewsArticles;
};

const scrapArticle = async (url: string) => {
  try {
    const res: AxiosResponse<string> = await axios.get(url, {
      proxy: {
        host: env.ROTATING_PROXY_HOST,
        port: Number(env.ROTATING_PROXY_PORT),
        auth: {
          username: env.ROTATING_PROXY_USER,
          password: env.ROTATING_PROXY_PASSWORD,
        },
        protocol: "http",
      },
    });

    const data = res.data;
    const request = res.request as { res: { responseUrl: string } };
    const ogUrl = request?.res?.responseUrl;
    return await extractFromHtml(data, ogUrl);
  } catch (e) {
    console.error(
      `❌ scrapping fail ${url}`,
      (e as { message: string }).message
    );
    return null;
  }
};

const getScrappedArticles = async (
  coinTickers: string[],
  fetchedNewsArticles: Map<string, CryptoPanicResponseData["results"]>
) => {
  const scrappedArticles = [];
  for (const ticker of coinTickers) {
    const promises = [];
    console.log(`\n========= 📰 Scrapping news for ${ticker} =========`);
    for (const result of fetchedNewsArticles.get(ticker) || []) {
      const url = result.url.replace(
        /https:\/\/cryptopanic\.com\/news\/(\d+)\/.*/,
        "https://cryptopanic.com/news/click/$1/"
      );
      promises.push(
        (async () => {
          const scrapperRes = await scrapArticle(url);
          console.log(`🗞️ | ${result.title}`);
          if (scrapperRes) {
            return {
              ticker,
              title: result.title,
              url: scrapperRes.url as string,
              rawContent: scrapperRes.content,
              image: scrapperRes.image,
              createdAt: result.created_at,
              description: scrapperRes.description,
            };
          }
        })()
      );
    }
    const resolvedPromises = await Promise.all(promises);
    scrappedArticles.push(...resolvedPromises);
  }
  return scrappedArticles.filter(isTruthy);
};

export function isTruthy<T>(value?: T | undefined | null | false): value is T {
  return !!value;
}
