import { getCurrentDate } from "~/utils/getCurrentDate";
import dynamic from "next/dynamic";

const DashBoardGoButton = dynamic(() => import("./DashboardGoBtn"), {
  ssr: false,
});

const Hero = () => {
  return (
    <div className="flex flex-col items-center justify-between gap-10 md:gap-20 lg:flex-row">
      <div className="">
        <h1 className="max-w-2xl font-inter text-4xl font-black text-white md:text-5xl">
          Stay on Top of the Latest Crypto health News
        </h1>
        <p className="mt-8 max-w-md font-display text-lg font-normal leading-5 text-white opacity-60">
          Subscribe to your favorite crypto tokens to get latest news on them
          everyday. <br className="hidden md:block" /> No more no less!
        </p>
      </div>
      <div className="flex flex-col gap-4 rounded-xl bg-darkAccent p-10 drop-shadow-xl">
        <div>
          <p className="text-white opacity-60">Briefing for</p>
          <h1 className="mt-2 max-w-sm font-display text-3xl font-black text-white md:text-5xl">
            {getCurrentDate(Date.now())}
          </h1>
        </div>
        <div className="flex justify-end">
          <DashBoardGoButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
