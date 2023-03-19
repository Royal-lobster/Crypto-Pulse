import { create } from "zustand";
import { type SubscribedTokens } from "~/pages";

interface SubscriptionsStore {
  tokens: SubscribedTokens[];
  addToken: (token: SubscribedTokens) => void;
  removeToken: (tokenId: string) => void;
}

export const useSubscriptionsStore = create<SubscriptionsStore>((set) => ({
  tokens: [],
  addToken: (token) => set((state) => ({ tokens: [...state.tokens, token] })),
  removeToken: (tokenId) =>
    set((state) => ({
      tokens: state.tokens.filter((token) => token.id !== tokenId),
    })),
}));
