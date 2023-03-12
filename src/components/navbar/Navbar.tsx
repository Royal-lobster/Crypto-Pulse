import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import CryptoCurrentLogo from "~/Icons/Logo";
import { useCheckWeb3Token } from "~/hooks/useWeb3Token";
import AuthModel from "./AuthModel";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { token } = useCheckWeb3Token();
  return (
    <nav className="relative z-10 flex w-full basis-full items-center justify-between pt-5 pr-5">
      <CryptoCurrentLogo />
      <ConnectButton chainStatus="icon" />
      {!token && isConnected && <AuthModel />}
    </nav>
  );
};

export default Navbar;
