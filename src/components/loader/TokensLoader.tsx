import Star from "../Icons/Star";

const TokensLoader = () => {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center text-[#8C8C8C]">
      <Star />
      <p className="mt-2 font-display text-2xl">Fetching Data</p>
    </div>
  );
};

export default TokensLoader;
