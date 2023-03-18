import { api } from "~/utils/api";
import StickyTokenCard from "../Card/StickyTokenCard";
import DashboardNews from "./DashboardNews";

const DashboardMainContent = ({
  tokenImage,
  tokenId,
}: {
  tokenImage: string;
  tokenId: string;
}) => {
  const { data, isLoading } = api.dashboard.getNewsAndStatistics.useQuery({
    tokenId,
  });

  return (
    <div className="z-10 mx-auto mt-20 flex max-w-7xl gap-[50px] pl-[70px] pb-20">
      <div className="grid flex-grow gap-10">
        <DashboardNews id={tokenId} />
      </div>
      <div className="relative">
        <StickyTokenCard
          tokenName={data?.Statistics?.tokenId}
          image={tokenImage}
          dayHighest={data?.Statistics?.dayHighestPrice}
          dayLowest={data?.Statistics?.dayLowestPrice}
          totalVolume={data?.Statistics?.dayVolume}
        />
      </div>
    </div>
  );
};

export default DashboardMainContent;
