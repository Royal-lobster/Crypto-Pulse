import { ConnectButton } from "@rainbow-me/rainbowkit";
import CryptoCurrentLogo from "~/Icons/Logo";

const Navbar = () => {
  return (
    <nav className="relative z-10 flex w-full basis-full items-center justify-between pt-5 pr-5">
      <CryptoCurrentLogo />
      <ConnectButton chainStatus="icon" />
    </nav>
  );
};

export default Navbar;
