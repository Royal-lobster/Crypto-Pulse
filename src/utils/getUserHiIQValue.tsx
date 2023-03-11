import { TRPCError } from "@trpc/server";
import axios from "axios";
import { env } from "~/env.mjs";

export const getUserHiIQValue = async (userAddress: string) => {
  try {
    const response = await axios.post<{ result: string }>(
      `https://eth-mainnet.alchemyapi.io/v2/${env.ALCHEMY_API_KEY}`,
      {
        jsonrpc: "2.0",
        id: 1,
        method: "eth_call",
        params: [
          {
            to: env.HiIQ_CONTRACT_ADDRESS,
            data: `0x70a082310000000000000000${userAddress.replace("0x", "")}`,
          },
          "latest",
        ],
      }
    );
    const balance = parseInt(response.data.result, 16);
    return balance;
  } catch (error) {
    throw new TRPCError({
      message: `Error getting user HiIQ balance`,
      code: "INTERNAL_SERVER_ERROR",
    });
  }
};
