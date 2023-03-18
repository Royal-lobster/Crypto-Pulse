import { TRPCError } from "@trpc/server";
import axios from "axios";
import { env } from "~/env.mjs";

export const getUserHiIQBalance = async (userAddress: string) => {
  try {
    const response = await axios.post<{ result: string }>(
      `https://eth-${
        env.NEXT_PUBLIC_NODE_ENV === "production" ? "mainnet" : "goerli"
      }.alchemyapi.io/v2/${env.NEXT_PUBLIC_ALCHEMY_API_KEY}`,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [
          {
            from: "0x0000000000000000000000000000000000000000",
            to: env.NEXT_PUBLIC_HiIQ_CONTRACT_ADDRESS,
            data: `0x70a08231000000000000000000000000${userAddress.replace(
              "0x",
              ""
            )}`,
          },
          "latest",
        ],
      }
    );
    let balance = parseInt(response.data.result, 16); // convert hex to decimal
    balance = balance / 10 ** 18; // convert to IQ
    balance = Math.floor(balance);
    return balance || 0;
  } catch (error) {
    console.log(error);
    throw new TRPCError({
      message: `Error getting user hiIQ balance`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
