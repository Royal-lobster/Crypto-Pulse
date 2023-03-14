import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import CryptoCurrentLogo from "~/Icons/Logo";
import { useCheckWeb3Token } from "~/hooks/useWeb3Token";
import AuthModel from "./AuthModel";
import { api } from "~/utils/api";
import { useEffect } from "react";

const Navbar = () => {
  const { isConnected } = useAccount();
  const { token } = useCheckWeb3Token();
  const { address } = useAccount();
  const { mutateAsync } = api.user.registerUser.useMutation();

  useEffect(() => {
    const mutate = async () => {
      if (token && address) console.log(await mutateAsync());
    };
    mutate().catch((e) => console.log(e));
  }, [address, mutateAsync, token]);

  return (
    <>
      <nav className="relative z-10 flex w-full basis-full items-center justify-between pt-5 pr-5">
        <CryptoCurrentLogo />
        <ConnectButton chainStatus="icon" />
      </nav>
      {!token && isConnected && <AuthModel />}
    </>
  );
};

export default Navbar;
