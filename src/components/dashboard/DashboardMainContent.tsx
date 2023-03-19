import { type NewsDetails } from "types/news";
import { api } from "~/utils/api";
import StickyTokenCard from "../Card/StickyTokenCard";
import Star from "../Icons/Star";
import DashboardNews from "./DashboardNews";

interface DashboardMainContentProps {
  tokenName: string;
  tokenImage: string;
  tokenId: string;
  setIsOpen: (open: boolean) => void;
  handleNewsClick: (news: NewsDetails) => void;
}

const DashboardMainContent = ({
  tokenName,
  tokenImage,
  tokenId,
  setIsOpen,
  handleNewsClick,
}: DashboardMainContentProps) => {
  const { data, isLoading } = api.dashboard.getNewsAndStatistics.useQuery({
    tokenId,
  });

  if (isLoading && !data)
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32 text-white">
          <Star />
          <p className="mt-2 font-display text-2xl">Fetching Data</p>
        </div>
      </>
    );

  if (!data && !isLoading)
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32 text-white">
          <Star noAnimate />
          <h1 className="mt-5 text-center font-display text-3xl">
            We had a hiccup :(
          </h1>
          <p className="mx-auto mt-6 max-w-[360px] text-center font-display text-[#BDBDBD] ">
            We tried very hard to get the data that something went wrong in
            backend. Please come here again ! Mean time click on other tokens !
          </p>
        </div>
      </>
    );

  return (
    <div className="z-10 mx-auto mt-20 flex max-w-7xl gap-[50px] pr-[70px] pb-20">
      <div className="relative">
        <StickyTokenCard
          tokenName={tokenName}
          image={tokenImage}
          dayHighest={data?.Statistics?.dayHighestPrice}
          dayLowest={data?.Statistics?.dayLowestPrice}
          totalVolume={data?.Statistics?.dayVolume}
          isLoading={isLoading}
        />
      </div>
      <div className="grid flex-grow gap-10">
        {data?.news && (
          <DashboardNews
            setIsOpen={setIsOpen}
            news={data?.news}
            handleNewsClick={handleNewsClick}
          />
        )}
      </div>
    </div>
  );
};

export default DashboardMainContent;
