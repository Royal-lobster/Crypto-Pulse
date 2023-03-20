import { useEffect, useState } from "react";
import { type Coin } from "types/coin";
import { useHiIQTokensLeft } from "~/hooks/useHiIQTokensLeft";
import SearchIcon from "../../Icons/Search";
import TokensLoader from "../../loader/TokensLoader";
import TokenCard from "./TokenCard";
import { Popover } from "@headlessui/react";

const SearchAndSelectTokens = () => {
  const [query, setQuery] = useState("");
  const [coinsData, setCoinsData] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { tokensLimit, userHiIQ } = useHiIQTokensLeft();

  useEffect(() => {
    const getCoins = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(
          `https://api.coingecko.com/api/v3/search?query=${query}`
        );
        const data = (await res.json()) as { coins: Coin[] };
        const coins = data.coins.slice(0, 24);
        setCoinsData(coins);
      } catch (error) {}
    };
    getCoins().finally(() => {
      setIsLoading(false);
    });
  }, [query]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    setQuery(input.value);
  };

  return (
    <div className="mt-28">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <div className="text-white">
          <h1 className="self-center font-display text-2xl font-bold ">
            Select your Tokens !
          </h1>
          <div className="mt-3 max-w-sm font-display text-lg">
            You have <b>{userHiIQ} HiIQ.</b> You can select up to{" "}
            <Popover className="relative">
              <Popover.Button className="underline decoration-gray-500 decoration-dotted underline-offset-4">
                <b>{tokensLimit}</b> Tokens.
              </Popover.Button>
              <Popover.Panel className="absolute z-10 mt-2 rounded-md bg-darkAccent p-4">
                <p className="text-sm text-white">
                  <span className="block rounded-md bg-secondary p-3 text-center">
                    You can choose up the tokens depending on your HiIQ balance.
                  </span>
                  <ul className="mx-auto mt-3 max-w-[70%] divide-y divide-white/10">
                    <li className="flex justify-between">
                      <span>3 tokens</span>{" "}
                      <span className="text-right">Free</span>
                    </li>
                    <li className="flex justify-between">
                      <span>5 tokens</span>{" "}
                      <span className="text-right"> &gt; 10k HiIQ</span>
                    </li>
                    <li className="flex justify-between">
                      <span>10 tokens</span>{" "}
                      <span className="text-right"> &gt; 100k HiIQ</span>
                    </li>
                    <li className="flex justify-between">
                      <span>15 tokens</span>{" "}
                      <span className="text-right"> &gt; 1M HiIQ</span>
                    </li>
                  </ul>
                </p>
              </Popover.Panel>
            </Popover>
          </div>
        </div>
        <form
          onSubmit={handleSearchSubmit}
          className="flex h-[60px] w-full max-w-lg rounded-xl bg-[#1A1B1F] pr-2.5 shadow-md"
        >
          <div className="flex h-[60px] w-[60px] items-center justify-center rounded-l-xl bg-[#3D4045] text-[#a4a4a49b]">
            <SearchIcon />
          </div>
          <input
            type="text"
            className="h-[60px] flex-1 appearance-none border-none bg-transparent pl-4 text-white outline-none placeholder:text-[#626262]"
            placeholder="Search for token"
          />
          <button className="h-[45px] cursor-pointer self-center rounded-xl bg-[#FF5CAA] px-6 font-display text-white">
            Search
          </button>
        </form>
      </div>
      {isLoading || !coinsData ? (
        <TokensLoader />
      ) : (
        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {coinsData.map((coin) => (
            <TokenCard
              id={coin.id}
              large={coin.large || (coin.image?.large as string)}
              key={coin.id}
              thumb={coin.large as string}
              name={coin.name}
              ticker={coin.symbol}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchAndSelectTokens;
