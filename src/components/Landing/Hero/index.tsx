import { getCurrentDate } from "~/utils/getCurrentDate";
import dynamic from "next/dynamic";

const DashBoardGoButton = dynamic(() => import("./DashboardGoBtn"), {
  ssr: false,
});

const Hero = () => {
  return (
    <div className="grid grid-cols-2 gap-20">
      <div className="col-span-2 self-center sm:col-span-1">
        <h1 className="font-inter text-5xl font-black text-white">
          <span className="block">Stay on Top of the Latest</span>
          <span className="block">Crypto health News</span>
        </h1>
        <p className="mt-8 w-2/3 font-display text-lg font-normal leading-5 text-white opacity-60">
          Subscribe to your favorite crypto tokens to get latest news on them
          everyday. No more no less!
        </p>
      </div>
      <div className="col-span-1 rounded-xl bg-[#1A1B1F] p-10 drop-shadow-xl">
        <p className="text-white opacity-60">Briefing for</p>
        <h1 className="mt-2 w-[80%] font-display text-5xl font-black text-white">
          {getCurrentDate(Date.now())}
        </h1>
        <div className="flex justify-end">
          <DashBoardGoButton />
        </div>
      </div>
    </div>
  );
};

export default Hero;
