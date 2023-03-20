import { useQuery } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import TokensLoader from "../../loader/TokensLoader";
import TokenCard from "./TokenCard";
import axios from "axios";
import { env } from "~/env.mjs";

const TokenList = ({ query }: { query?: string }) => {
  const { data: coinsData, isLoading } = useQuery({
    queryKey: ["search", query || ""],
    queryFn: async () => {
      if (query && query.length > 0) {
        const { data } = await axios.get<{ coins: Coin[] }>(
          `https://api.coingecko.com/api/v3/search?query=${query}`,
          {
            proxy: {
              host: env.ROTATING_PROXY_HOST,
              port: Number(env.ROTATING_PROXY_PORT),
              auth: {
                username: env.ROTATING_PROXY_USER,
                password: env.ROTATING_PROXY_PASSWORD,
              },
              protocol: "http",
            },
          }
        );
        return data.coins;
      }

      const { data } = await axios.get<Coin[]>(
        "https://api.coingecko.com/api/v3/coins/",
        {
          proxy: {
            host: env.ROTATING_PROXY_HOST,
            port: Number(env.ROTATING_PROXY_PORT),
            auth: {
              username: env.ROTATING_PROXY_USER,
              password: env.ROTATING_PROXY_PASSWORD,
            },
            protocol: "http",
          },
        }
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
              large={coin.large || (coin.image?.large as string)}
              key={coin.id}
              thumb={coin.thumb || (coin.image?.thumb as string)}
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
