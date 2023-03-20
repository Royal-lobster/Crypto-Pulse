import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useIsMutating } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

const DashBoardGoButton = () => {
  const { isConnected } = useAccount();
  const isFetching = useIsMutating();
  const router = useRouter();
  return (
    <>
      {" "}
      {isConnected ? (
        <button
          disabled={isFetching > 0}
          data-disabled={isFetching > 0 || undefined}
          onClick={() => {
            router.push("/dashboard").catch((e) => console.log(e));
          }}
          className="flex cursor-pointer items-center gap-2 rounded-xl bg-accent py-2 px-8 font-display text-white data-[disabled]:cursor-wait data-[disabled]:bg-accent/25"
        >
          {isFetching ? <ArrowPathIcon className="w-4 animate-spin" /> : <></>}
          Check the Area
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
