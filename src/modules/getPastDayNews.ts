import { extract } from "@extractus/article-extractor";
import axios, { type AxiosResponse } from "axios";
import { env } from "~/env.mjs";
import { type ResponseData as CryptoPanicResponseData } from "~/types/cryptopanic";

export const getPastDayNews = async (coinTickers: string[], days: number) => {
  const fetchedNewsArticles = await fetchCryptoPanicArticles(coinTickers, days);
  const scrappedArticles = await getScrappedArticles(
    coinTickers,
    fetchedNewsArticles
  );
  return scrappedArticles.filter(isTruthy);
};

export function isTruthy<T>(value?: T | undefined | null | false): value is T {
  return !!value;
}

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
        `https://cryptopanic.com/api/v1/posts/?auth_token=${env.CRYPTOPANIC_API_KEY}&currencies=${ticker}&public=true&filter=hot&period=${days}d&kind=news`
      );
      const topNews = newsRes.data.results?.slice(0, 6);
      fetchedNewsArticles.set(ticker, topNews);
    } catch (e) {
      console.error(`❌ cryptopanic fetch fail for ${ticker}`);
    }
  }
  return fetchedNewsArticles;
};

const scrapArticle = async (url: string) => {
  try {
    return await extract(url);
  } catch (e) {
    console.error(`❌ scrapping fail ${url}`);
    return null;
  }
};

const getScrappedArticles = async (
  coinTickers: string[],
  fetchedNewsArticles: Map<string, CryptoPanicResponseData["results"]>
) => {
  const promises = [];
  for (const ticker of coinTickers) {
    console.log("📰 Scraping news articles for", ticker);
    for (const result of fetchedNewsArticles.get(ticker) || []) {
      const url = result.url.replace(
        /https:\/\/cryptopanic\.com\/news\/(\d+)\/.*/,
        "https://cryptopanic.com/news/click/$1/"
      );
      promises.push(
        (async () => {
          const scrapperRes = await scrapArticle(url);
          console.log("🗞️", result.title);
          if (scrapperRes) {
            return {
              ticker,
              title: result.title,
              url: result.url,
              rawContent: scrapperRes.content,
              summary: scrapperRes.description,
              image: scrapperRes.image,
              createdAt: result.created_at,
            };
          }
        })()
      );
    }
  }
  return Promise.all(promises);
};
