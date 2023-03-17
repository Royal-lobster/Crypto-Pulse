import { type Token, type User } from "@prisma/client";
import React, { useCallback } from "react";
import { useSigner } from "wagmi";
import { sign, verify } from "web3-token";
import { create } from "zustand";

export const useTokenStore = create<{
  token: string | null;
  setToken: (token: string | null) => void;
}>((set) => ({
  token: null,
  setToken: (token) => set({ token }),
}));

export const useWeb3Token = () => {
  const { token, setToken } = useTokenStore((state) => state);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [error, setError] = React.useState<string>();
  const [isReSignToken, reSignToken] = React.useState<boolean>(false);
  const { data: signer } = useSigner();

  const generateNewTokenAndStore = useCallback(async () => {
    if (!signer) return;
    const freshToken = await sign((msg) => signer.signMessage(msg), {
      statement:
        "Welcome to IQ.Wiki ! Click to sign in and accept the IQ.Wiki Terms of Service: https://everipedia.com/static/terms. This request will not trigger a blockchain transaction or cost any gas fees. Your authentication status will reset after 7 days. ",
      expires_in: "7d",
    });
    localStorage.setItem("USER_TOKEN", freshToken);
    setToken(freshToken);
  }, [setToken, signer]);

  const fetchStoredToken = useCallback(() => {
    const storedToken = localStorage.getItem("USER_TOKEN");
    if (storedToken) {
      const { address, body } = verify(storedToken);
      if (address && body) {
        setToken(storedToken);
      }
    } else {
      throw new Error("No token found");
    }
  }, [setToken]);

  React.useEffect(() => {
    const retrieveWeb3Token = async () => {
      if (isReSignToken) setError("");
      else reSignToken(false);

      const generateNewToken = async () => {
        setLoading(true);
        try {
          await generateNewTokenAndStore();
        } catch (e) {
          setError(e as string);
        }
        setLoading(false);
      };

      try {
        fetchStoredToken();
      } catch {
        await generateNewToken();
      }
    };
    retrieveWeb3Token().catch((e) => setError(e as string));
  }, [signer, isReSignToken, generateNewTokenAndStore, fetchStoredToken]);

  return { token, loading, reSignToken, error };
};

export const useCheckWeb3Token = () => {
  const { token, setToken } = useTokenStore((state) => state);

  React.useEffect(() => {
    const storedToken = localStorage.getItem("USER_TOKEN");
    if (storedToken) {
      try {
        const { address, body } = verify(storedToken);
        if (address && body) {
          setToken(storedToken);
        }
      } catch (e) {
        setToken(null);
      }
    }
  }, [setToken]);

  return { token };
};
