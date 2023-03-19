import { type NextPage } from "next";
import dynamic from "next/dynamic";
import { useAccount } from "wagmi";
import Hero from "~/components/Landing/Hero";
import SubscribedTokensSection from "~/components/Landing/SubscribedTokensSection";

const SelectTokensSection = dynamic(
  () => import("../components/Landing/SelectTokensSection"),
  {
    ssr: false,
  }
);

const MarketingSection = dynamic(
  () => import("../components/Landing/MarketingSection"),
  {
    ssr: false,
  }
);

export type SubscribedTokens = {
  id: string;
  name: string;
  ticker: string;
  image: string;
};

export interface TokensListProps {
  subscribedTokens: SubscribedTokens[];
  toggleToken: (tokenId: string) => void;
}

const Home: NextPage = () => {
  const { isConnected } = useAccount();

  return (
    <main className=" pb-32">
      <div className="relative z-10 mx-auto mt-20 max-w-7xl">
        <Hero />
        {isConnected ? (
          <>
            <SubscribedTokensSection />
            <SelectTokensSection />
          </>
        ) : (
          <MarketingSection />
        )}
      </div>
    </main>
  );
};

export default Home;
