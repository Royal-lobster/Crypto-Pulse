import { api } from "~/utils/api";
import TokenCard from "../tokenCard";

const SubscribedTokensList = () => {
  const { data } = api.dashboard.getUserSubscribedTokens.useQuery();

  if (!data) return null;

  return (
    <div className="mt-28">
      <h1 className="font-display text-2xl font-bold text-white">
        Your Subscribed Tokens
      </h1>
      <div className="mt-14 grid grid-cols-4 gap-5">
        {data?.map((token, i) => (
          <TokenCard
            key={i}
            name={token.ticker}
            symbol={token.ticker}
            thumb={token.image}
            id={token.id}
            tokenIsChecked
          />
        ))}
      </div>
    </div>
  );
};

export default SubscribedTokensList;
