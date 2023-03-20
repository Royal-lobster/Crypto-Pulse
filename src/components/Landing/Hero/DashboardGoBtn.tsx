/* eslint-disable @next/next/no-html-link-for-pages */
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useIsMutating } from "@tanstack/react-query";
import { useAccount } from "wagmi";

const DashBoardGoButton = () => {
  const { isConnected } = useAccount();
  const isFetching = useIsMutating();

  return (
    <>
      {" "}
      {isConnected ? (
        <button
          disabled={isFetching > 0}
          data-disabled={isFetching > 0 || undefined}
          className="cursor-pointer rounded-xl bg-accent font-display text-white data-[disabled]:cursor-wait data-[disabled]:bg-accent/25"
        >
          <a href="/dashboard" className="flex items-center gap-2 py-2 px-8">
            {isFetching ? (
              <ArrowPathIcon className="w-4 animate-spin" />
            ) : (
              <></>
            )}
            Check the Area
          </a>
        </button>
      ) : (
        <p className="text-[#BABABA]">
          Connect your <br /> wallet to checkout
        </p>
      )}
    </>
  );
};

export default DashBoardGoButton;
