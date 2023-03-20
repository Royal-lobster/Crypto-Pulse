import { useSubscriptionsStore } from "~/store/subscriptions";
import TokenCard from "./TokenCard";

const SubscribedTokens = () => {
  const subscribedTokens = useSubscriptionsStore((state) => state.tokens);

  if (!subscribedTokens || subscribedTokens.length === 0) return null;
  return (
    <div className="mt-28">
      <h1 className="font-display text-2xl font-bold text-white">
        Your Subscribed Tokens
      </h1>
      <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {subscribedTokens?.map((token, i) => (
          <TokenCard
            key={i}
            name={token.name}
            large={token.image}
            ticker={token.ticker}
            thumb={token.image}
            id={token.id}
          />
        ))}
      </div>
    </div>
  );
};

export default SubscribedTokens;
