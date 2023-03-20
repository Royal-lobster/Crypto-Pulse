import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";
import { useSubscriptionsStore } from "~/store/subscriptions";
import { getUserHiIQBalance } from "~/utils/getUserHiIQValue";

export const useHiIQTokensLeft = () => {
  const { address } = useAccount();
  const { data: userHiIQ } = useQuery(
    ["userHiIQBalance", address],
    async () => {
      const balance = await getUserHiIQBalance(address || "");
      return balance;
    }
  );
  const tokensSubscribed = useSubscriptionsStore(
    (state) => state.tokens
  ).length;

  let tokensLimit: number;

  if (!userHiIQ) {
    tokensLimit = 3;
  } else if (userHiIQ > 1000000) {
    tokensLimit = 15;
  } else if (userHiIQ > 100000) {
    tokensLimit = 10;
  } else if (userHiIQ > 10000) {
    tokensLimit = 5;
  } else {
    tokensLimit = 3;
  }

  const tokensLeft = tokensLimit - tokensSubscribed;

  return { tokensLimit, userHiIQ, tokensLeft };
};
