import { useRef, useState } from "react";
import SearchIcon from "../../Icons/Search";
import TokenList from "./TokenList";
import Close from "~/components/Icons/Close";

const SearchAndSelectTokens = () => {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState<string>("");

  const handleSearchSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setQuery(inputRef.current?.value as string);
  };

  const clearQuery = () => {
    setInputValue("");
    setQuery("");
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
            ref={inputRef}
            value={inputValue}
            type="text"
            className="h-[60px] flex-1 appearance-none border-none bg-transparent pl-4 text-white outline-none placeholder:text-[#626262]"
            placeholder="Search for token"
            onChange={(e) => {
              setInputValue(e.target?.value);
            }}
          />
          {inputValue?.length > 0 && (
            <button
              className="mr-6 flex items-center text-white"
              onClick={clearQuery}
            >
              <Close />
            </button>
          )}
          <button
            onClick={() => {
              setQuery(inputRef.current?.value as string);
            }}
            className="h-[45px] cursor-pointer self-center rounded-xl bg-[#FF5CAA] px-6 font-display text-white"
          >
            Search
          </button>
        </form>
      </div>
      <TokenList query={query} />
    </div>
  );
};

export default SearchAndSelectTokens;
