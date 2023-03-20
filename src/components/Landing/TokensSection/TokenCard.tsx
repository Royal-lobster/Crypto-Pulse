import Image from "next/image";
import { useState } from "react";
import { useHiIQTokensLeft } from "~/hooks/useHiIQTokensLeft";
import { useSubscriptionsStore } from "~/store/subscriptions";
import { api } from "~/utils/api";

type TokenCardProps = {
  id: string;
  large: string;
  thumb?: string;
  name: string;
  ticker: string;
};

const TokenCard = ({ large, name, ticker, thumb, id }: TokenCardProps) => {
  const tokenIsChecked = useSubscriptionsStore((state) =>
    state.tokens.find((token) => token.id === id)
  );
  const [isChecked, setIsChecked] = useState(!!tokenIsChecked);
  const { mutate: mutateRemove } = api.token.removeToken.useMutation();
  const { mutate: mutateAdd } = api.token.addToken.useMutation();
  const removeToken = useSubscriptionsStore((state) => state.removeToken);
  const addToken = useSubscriptionsStore((state) => state.addToken);
  const { tokensLeft } = useHiIQTokensLeft();
  const isDisabled = tokensLeft <= 0 && !isChecked;

  const handleTokenClick = () => {
    if (isDisabled) return;
    setIsChecked(!isChecked);
    if (isChecked) {
      mutateRemove({ tokenId: id });
      removeToken(id);
    }
    if (!isChecked) {
      mutateAdd({
        tokenId: id,
        tickerId: ticker,
        tokenImg: large,
        tokenName: name,
      });
      addToken({
        id,
        name,
        ticker: ticker,
        image: large,
      });
    }
  };

  return (
    <div
      onClick={handleTokenClick}
      data-checked={tokenIsChecked || isChecked || undefined}
      data-disabled={isDisabled || undefined}
      className="flex cursor-pointer items-center rounded-xl py-2.5 px-4 outline-[#5d5f62] hover:shadow-lg  hover:outline data-[disabled]:cursor-auto data-[checked]:bg-[#3D4045] data-[disabled]:opacity-50 data-[disabled]:shadow-none data-[disabled]:outline-none"
    >
      <div className="flex w-full items-center gap-3">
        <Image
          src={thumb ? thumb : large}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="flex flex-col gap-2">
          <h1 className="hidden font-display text-base font-medium text-white md:block">
            {name}
          </h1>
          <p className="uppercase text-white md:text-xs md:text-[#ffffff7a]">
            {ticker}
          </p>
        </div>
        <div className="relative ml-auto text-[#FFFBFB]">
          <input
            disabled={isDisabled}
            type="checkbox"
            name="token"
            checked={isChecked}
            id="token"
            className="token-card-checkbox grid h-6 w-6 origin-bottom-left translate-y-[0.075em] appearance-none place-content-center rounded border-[#FFFBFB] bg-[#3D4045] font-[inherit] text-[currentColor] before:h-4 before:w-4 before:scale-0 before:bg-[CanvasText] before:shadow-[inset_1em_1em_#fff] before:transition before:ease-in-out before:content-[''] checked:bg-[#FF5CAA] checked:before:scale-100"
          />
        </div>
      </div>
    </div>
  );
};

export default TokenCard;
