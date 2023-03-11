import { useQuery, type QueryObserverResult } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import TokenCard from "../tokenCard/TokenCard";

const TokenList = ({ query }: { query?: string }) => {
  const searchCoins = async () => {
    if (!query) return;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    return res.json();
  };

  const { data }: QueryObserverResult<{ coins: Coin[] }, unknown> = useQuery({
    queryKey: ["search"],
    queryFn: searchCoins,
  });

  const coins = data?.coins;

  return (
    <>
      <div className="mt-14 grid grid-cols-4 gap-5">
        {coins &&
          coins?.map(
            (token) =>
              token && (
                <TokenCard
                  id={token.id}
                  key={token.id}
                  thumb={token.large as string}
                  name={token.name}
                  symbol={token.symbol}
                />
              )
          )}
      </div>
    </>
  );
};

export default TokenList;
