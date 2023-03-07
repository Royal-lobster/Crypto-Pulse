import type { AxiosResponse } from "axios";
import axios from "axios";

interface PriceData {
  timestamp: number;
  price: number;
}

interface TotalVolumeData {
  timestamp: number;
  volume: number;
}

interface MarketChartData {
  prices: PriceData[];
  total_volumes: TotalVolumeData[];
}

type PastDayDataResponse = {
  pastDayHighestPrice: number;
  pastDayLowestPrice: number;
  pastDayTotalVolume: number;
};

export async function getPastDayData(
  coinId: string,
  vsCurrency: string,
  days: number
): Promise<PastDayDataResponse> {
  const url = `https://api.coingecko.com/api/v3/coins/${coinId}/market_chart?vs_currency=${vsCurrency}&days=${days}`;

  const response: AxiosResponse<MarketChartData> = await axios.get(url);
  const data: MarketChartData = response.data;
  const prices: PriceData[] = data.prices;
  const totalVolumes: TotalVolumeData[] = data.total_volumes;

  const pastDayHighestPrice: number = Math.max(
    ...prices.map((price) => price.price)
  );
  const pastDayLowestPrice: number = Math.min(
    ...prices.map((price) => price.price)
  );
  const pastDayTotalVolume: number = totalVolumes.reduce(
    (total, volume) => total + volume.volume,
    0
  );

  return {
    pastDayHighestPrice,
    pastDayLowestPrice,
    pastDayTotalVolume,
  };
}
