import { type QueryObserverResult, useQuery } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import TokenCard from "../tokenCard";

const SelectToken = () => {
  const getCoins = async () => {
    const res = await fetch("https://api.coingecko.com/api/v3/coins/");

    return res.json();
  };

  const { data }: QueryObserverResult<Coin[], unknown> = useQuery({
    queryKey: ["coins"],
    queryFn: getCoins,
  });

  return (
    <div className="mt-14 grid grid-cols-4 gap-5">
      {data &&
        data
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
