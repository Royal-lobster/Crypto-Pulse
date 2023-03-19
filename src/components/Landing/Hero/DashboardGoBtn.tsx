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
            router
              .push("/dashboard")
              .then(() => {
                console.log("Navigation successful");
              })
              .catch((error) => {
                console.error(error);
              });
          }}
          className="cursor-pointer rounded-xl bg-[#FF5CAA] py-4 px-8 font-display text-white data-[disabled]:bg-[#A44D76]"
        >
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
