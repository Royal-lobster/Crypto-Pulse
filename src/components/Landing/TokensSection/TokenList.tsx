import { useQuery } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import TokensLoader from "../../loader/TokensLoader";
import TokenCard from "./TokenCard";
import axios from "axios";

const TokenList = ({ query }: { query?: string }) => {
  const { data: coinsData, isLoading } = useQuery({
    queryKey: ["search", query || ""],
    queryFn: async () => {
      if (query && query.length > 0) {
        const { data } = await axios.get<{ coins: Coin[] }>(
          `https://api.coingecko.com/api/v3/search?query=${query}`
        );
        return data.coins;
      }

      const { data } = await axios.get<Coin[]>(
        "https://api.coingecko.com/api/v3/coins/"
      );
      return data;
    },
  });

  const coins = coinsData?.slice(0, 24);

  return (
    <>
      {isLoading && !coinsData ? (
        <TokensLoader />
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {coins?.map((coin) => (
            <TokenCard
              id={coin.id}
              image={coin.image}
              key={coin.id}
              thumb={coin.large as string}
              name={coin.name}
              ticker={coin.symbol}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default TokenList;
