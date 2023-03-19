/* eslint-disable @next/next/no-img-element */
import { ConnectButton } from "@rainbow-me/rainbowkit";
import React, { useCallback, useEffect, useState } from "react";
import { getBoringAvatar } from "~/utils/getBoringAvatar";
import { getUserHiIQBalance } from "~/utils/getUserHiIQValue";

interface UserAvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  address?: string;
  src?: string;
  size?: number;
}

const UserAvatar = ({ address, src, size = 25, ...rest }: UserAvatarProps) => {
  return (
    <div {...rest}>
      <div
        style={{ width: size, height: size }}
        className="overflow-hidden rounded-full "
      >
        {!src && address && <FetchedUserAvatar address={address} size={size} />}
        {src && (
          <img
            src={src}
            onError={(e) =>
              (e.currentTarget.src = getBoringAvatar(address || ""))
            }
            alt="avatar"
            className="h-full w-full bg-slate-200 text-slate-200 dark:bg-slate-700 dark:text-slate-700"
          />
        )}
      </div>
    </div>
  );
};

type RequiredPick<T, K extends keyof T> = T & Required<Pick<T, K>>;

const FetchedUserAvatar = ({
  address,
  size,
}: RequiredPick<UserAvatarProps, "address">) => {
  return (
    <img
      src={getBoringAvatar(address || "")}
      width={size}
      onError={(e) => (e.currentTarget.src = getBoringAvatar(address || ""))}
      height={size}
      alt="avatar"
      className="h-full w-full bg-slate-200 object-cover text-slate-200 dark:bg-slate-700 dark:text-slate-700"
    />
  );
};

const CustomConnectButton = ({ address }: { address: string }) => {
  const [hiIQBalance, setHiIQBalance] = useState<number>();

  const fetchHiIQBalance = useCallback(async () => {
    if (!address) return;
    const data = await getUserHiIQBalance(address);
    setHiIQBalance(data);
  }, [address]);

  useEffect(() => {
    void fetchHiIQBalance();
  }, [fetchHiIQBalance]);

  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");

        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <button
                    onClick={openConnectModal}
                    type="button"
                    className="cursor-pointer rounded-xl bg-[#FF5CAA] py-2 px-4 font-display text-white"
                  >
                    Connect Wallet
                  </button>
                );
              }

              if (chain.unsupported) {
                return (
                  <button
                    onClick={openChainModal}
                    type="button"
                    className="cursor-pointer rounded-xl bg-[#FF5CAA] py-2 px-4 font-display text-white"
                  >
                    Wrong network
                  </button>
                );
              }

              return (
                <div className="flex items-center gap-4">
                  <a
                    target="_blank"
                    href="https://iq.braindao.org/dashboard/stake"
                    className="hidden cursor-pointer rounded-xl bg-[#FF5CAA] py-2 px-4 font-display text-white md:inline-block"
                  >
                    🧠 Stake HiIQ
                  </a>
                  <button
                    className="flex items-center gap-2 rounded-xl bg-[#1A1B1F] py-1 pl-3 pr-1 shadow-lg"
                    onClick={openAccountModal}
                    type="button"
                  >
                    <p className="font-display font-bold text-white">
                      {hiIQBalance} HiIQ
                    </p>
                    <div className="flex gap-2 rounded-xl bg-none px-1 md:bg-[#ffffff0f] md:px-3 md:py-1.5">
                      <UserAvatar address={account.address} />
                      <p className="hidden font-display font-bold text-white md:block">
                        {" "}
                        {account.displayName}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomConnectButton;
