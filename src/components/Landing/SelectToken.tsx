import { type QueryObserverResult, useQuery } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import { api } from "~/utils/api";
import TokensLoader from "../loader/TokensLoader";
import TokenCard from "../tokenCard";

const SelectToken = () => {
  const { data: userData } = api.dashboard.getUserSubscribedTokens.useQuery();

  const getCoins = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/");

    return res.json();
  };

  const { data: coins, isFetching }: QueryObserverResult<Coin[], unknown> =
    useQuery({
      queryKey: ["coins"],
      queryFn: getCoins,
    });

  if (isFetching && !coins && !userData) return <TokensLoader />;

  const filteredCoins = coins?.filter(
    (coin) => !userData?.some((token) => token.id === coin.id)
  );

  return (
    <div className="mt-14 grid grid-cols-4 gap-5">
      {filteredCoins &&
        filteredCoins
          ?.slice(0, 24)
          .map(
            (token) =>
              token.image && (
                <TokenCard
                  id={token.id}
                  key={token.id}
                  image={token.image}
                  name={token.name}
                  symbol={token.symbol}
                />
              )
          )}
    </div>
  );
};

export default SelectToken;
