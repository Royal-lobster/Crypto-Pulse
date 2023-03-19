/* eslint-disable @next/next/no-img-element */
const MarketingSection = () => {
  return (
    <div className="mt-28 grid grid-cols-2 gap-20">
      <img src="/images/hero.svg" alt="hero" className="block" />
      <div className="self-center">
        <h1 className="font-inter text-4xl font-black text-white">
          <span className="block">Select from 100s of</span>{" "}
          <span className="block">Tokens!</span>
        </h1>
        <p className="mt-8 w-2/3 font-display text-lg font-normal leading-5 text-white opacity-60">
          Subscribe to various tokens and get informed on latest news and
          statistics on your favourite protocols
        </p>
      </div>
    </div>
  );
};

export default MarketingSection;
