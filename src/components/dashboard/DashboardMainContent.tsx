import { type NewsDetails } from "types/news";
import { api } from "~/utils/api";
import StickyTokenCard from "../Card/StickyTokenCard";
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
