import type { AxiosResponse } from "axios";
import axios from "axios";
import { type MarketChartData } from "~/types/coingekko";

export async function getPastDayStats(
  coinId: string,
  vsCurrency: string,
  days: number
) {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`;

  const { data }: AxiosResponse<MarketChartData> = await axios.get(url, {});

  const prices = data.prices;
  const totalVolumes = data.total_volumes;

  const pastDayHighestPrice: number = Math.max(
    ...prices.map(([, price]) => price)
  );

  const pastDayLowestPrice: number = Math.min(
    ...prices.map(([, price]) => price)
  );

  const pastDayTotalVolume: number = totalVolumes.reduce(
    (total, [, volume]) => total + volume,
    0
  );

  console.log(
    `💰 Fetched ${coinId} | H: ${pastDayHighestPrice}, L: ${pastDayLowestPrice}, V: ${pastDayTotalVolume}`
  );

  return {
    coinId,
    pastDayHighestPrice,
    pastDayLowestPrice,
    pastDayTotalVolume,
  };
}
