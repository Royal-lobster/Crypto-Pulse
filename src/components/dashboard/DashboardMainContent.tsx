import { type NewsDetails } from "types/news";
import { api } from "~/utils/api";
import StickyTokenCard from "../Card/StickyTokenCard";
import DashboardNews from "./DashboardNews";

const DashboardMainContent = ({
  tokenImage,
  tokenId,
  setIsOpen,
  handleNewsClick,
}: {
  tokenImage: string;
  tokenId: string;
  setIsOpen: (open: boolean) => void;
  handleNewsClick: (news: NewsDetails) => void;
}) => {
  const { data, isLoading } = api.dashboard.getNewsAndStatistics.useQuery({
    tokenId,
  });

  return (
    <div className="z-10 mx-auto mt-20 flex max-w-7xl gap-[50px] pl-[70px] pb-20">
      <div className="grid flex-grow gap-10">
        {data?.news && (
          <DashboardNews
            setIsOpen={setIsOpen}
            news={data?.news}
            handleNewsClick={handleNewsClick}
          />
        )}
      </div>
      <div className="relative">
        <StickyTokenCard
          tokenName={data?.Statistics?.tokenId}
          image={tokenImage}
          dayHighest={data?.Statistics?.dayHighestPrice}
          dayLowest={data?.Statistics?.dayLowestPrice}
          totalVolume={data?.Statistics?.dayVolume}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default DashboardMainContent;
