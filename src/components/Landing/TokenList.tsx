import { useQuery, type QueryObserverResult } from "@tanstack/react-query";
import { type Coin } from "types/coin";
import { api } from "~/utils/api";
import TokensLoader from "../loader/TokensLoader";
import TokenCard from "../tokenCard";

const TokenList = ({ query }: { query?: string }) => {
  const { data: userData } = api.dashboard.getUserSubscribedTokens.useQuery();

  const searchCoins = async () => {
    if (!query) return;

    const res = await fetch(
      `https://api.coingecko.com/api/v3/search?query=${query}`
    );

    return res.json();
  };

  const { data, isLoading }: QueryObserverResult<{ coins: Coin[] }, unknown> =
    useQuery({
      queryKey: ["search"],
      queryFn: searchCoins,
    });

  if (isLoading && !data) return <TokensLoader />;

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
                  tokenIsChecked={userData?.some(
                    (subscribedToken) => subscribedToken.id === token.id
                  )}
                />
              )
          )}
      </div>
    </>
  );
};

export default TokenList;
