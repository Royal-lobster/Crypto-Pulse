import "@rainbow-me/rainbowkit/styles.css";
import {
  getDefaultWallets,
  lightTheme,
  RainbowKitProvider,
} from "@rainbow-me/rainbowkit";
import { configureChains, createClient, WagmiConfig } from "wagmi";
import { mainnet, polygon, optimism, arbitrum } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, provider } = configureChains(
  [mainnet, polygon, optimism, arbitrum],
  [publicProvider()]
);

const { connectors } = getDefaultWallets({
  appName: "Crypto Currents",
  chains,
});

export const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export const RainbowConfigWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider
        theme={lightTheme({
          accentColor: "#da5597",
          accentColorForeground: "white",
          borderRadius: "small",
          fontStack: "system",
          overlayBlur: "small",
        })}
        chains={chains}
      >
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
};
