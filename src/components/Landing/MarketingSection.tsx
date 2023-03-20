/* eslint-disable @next/next/no-img-element */
const MarketingSection = () => {
  return (
    <div className="mt-20 flex flex-col-reverse justify-center gap-20 text-center md:flex-row md:text-left">
      <img
        src="/images/hero.svg"
        alt="hero"
        className="block md:max-w-xs lg:max-w-2xl"
      />
      <div className="max-w-lg md:self-center">
        <h1 className="font-inter text-2xl font-black text-white md:text-4xl">
          <span className="block">Select from 100s of</span>{" "}
          <span className="block">Tokens!</span>
        </h1>
        <p className="mt-8 max-w-md font-display text-lg font-normal leading-5 text-white opacity-60">
          Subscribe to various tokens and get informed on latest news and
          statistics on your favourite protocols
        </p>
      </div>
    </div>
  );
};

export default MarketingSection;
