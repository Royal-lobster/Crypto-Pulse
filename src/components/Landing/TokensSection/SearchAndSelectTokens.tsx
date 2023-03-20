import { useEffect, useState } from "react";
import { type Coin } from "types/coin";
import SearchIcon from "../../Icons/Search";
import TokensLoader from "../../loader/TokensLoader";
import TokenCard from "./TokenCard";

const SearchAndSelectTokens = () => {
  const [query, setQuery] = useState("");
  const [coinsData, setCoinsData] = useState<Coin[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getCoins = async () => {
      setIsLoading(true);
      try {
        console.log(query);
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
  }, [query, setCoinsData]);

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.elements[0] as HTMLInputElement;
    setQuery(input.value);
  };

  return (
    <div className="mt-28">
      <div className="flex flex-col justify-between gap-4 lg:flex-row">
        <h1 className="self-center font-display text-2xl font-bold text-white">
          Select your Tokens !
        </h1>
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
              image={coin.image}
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
