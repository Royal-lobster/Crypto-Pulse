import { useQuery } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import TokensLoader from "../loader/TokensLoader";
import TokenCard from "../tokenCard";
import axios from "axios";

const TokenList = ({ query }: { query?: string }) => {
  const { data: coinsData, isLoading } = useQuery({
    queryKey: ["search", query || ""],
    queryFn: async () => {
      if (query) {
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

  console.log(coinsData);

  return (
    <>
      {isLoading || !coinsData ? (
        <TokensLoader />
      ) : (
        <div className="mt-14 grid grid-cols-4 gap-5">
          {(coinsData as Coin[]).splice(0, 24).map((coin) => (
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
