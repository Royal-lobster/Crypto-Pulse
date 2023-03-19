import React, { useEffect } from "react";
import SubscribedTokensSection from "./SubscribedTokensSection";
import SelectTokensSection from "./SelectTokensSection";
import { api } from "~/utils/api";
import { useSubscriptionsStore } from "~/store/subscriptions";

const TokensSection = () => {
  const { data } = api.dashboard.getUserSubscribedTokens.useQuery();
  const setTokens = useSubscriptionsStore((state) => state.setTokens);
  useEffect(() => {
    if (data) {
      setTokens(
        data.map((token) => ({
          id: token.id,
          name: token.name,
          ticker: token.ticker,
          image: token.image,
        }))
      );
    }
  }, [data, setTokens]);
  return (
    <div>
      <SubscribedTokensSection />
      <SelectTokensSection />
    </div>
  );
};

export default TokensSection;
