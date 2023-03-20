import { type Statistics, type News } from "@prisma/client";
import { type NewsDetails } from "types/news";
import StickyTokenCard from "../Card/StickyTokenCard";
import Star from "../Icons/Star";
import DashboardNews from "./DashboardNews";

interface DashboardMainContentProps {
  tokenName: string;
  tokenImage: string;
  tokenId: string;
  setIsOpen: (open: boolean) => void;
  handleNewsClick: (news: NewsDetails) => void;
  stats: Statistics | null;
  news: News[];
}

const DashboardMainContent = ({
  tokenName,
  tokenImage,
  stats,
  setIsOpen,
  handleNewsClick,
  news,
}: DashboardMainContentProps) => {
  return (
    <div className="z-10 mx-auto mt-10 flex flex-col gap-[50px] px-0 pb-10 sm:px-8 md:px-10 lg:mt-20 lg:flex-row lg:pb-20 lg:pr-[100px] xl:max-w-7xl xl:px-0 xl:pr-[70px]">
      <div className="relative">
        <StickyTokenCard
          tokenName={tokenName}
          image={tokenImage}
          dayHighest={stats?.dayHighestPrice}
          dayLowest={stats?.dayLowestPrice}
          totalVolume={stats?.dayVolume}
        />
      </div>

      {news.length > 0 && (
        <div className="grid flex-grow gap-10">
          <DashboardNews
            setIsOpen={setIsOpen}
            news={news}
            handleNewsClick={handleNewsClick}
          />
        </div>
      )}
      {(!news || news.length === 0) && (
        <div className="flex w-full flex-col items-center justify-center text-white">
          <Star noAnimate />
          <h1 className="mt-5 text-center font-display text-3xl">
            We had a hiccup :(
          </h1>
          <p className="mx-auto mt-6 max-w-[360px] text-center font-display text-[#BDBDBD] ">
            We went far and beyond but no data.
          </p>
        </div>
      )}
    </div>
  );
};

export default DashboardMainContent;
