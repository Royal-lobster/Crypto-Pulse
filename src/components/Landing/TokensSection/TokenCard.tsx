import Image from "next/image";
import { useState } from "react";
import { useSubscriptionsStore } from "~/store/subscriptions";
import { api } from "~/utils/api";

type TokenCardProps = {
  id: string;
  image?: {
    large: string;
    thumb: string;
    small: string;
  };
  thumb?: string;
  name: string;
  ticker: string;
};

const TokenCard = ({ image, name, ticker, thumb, id }: TokenCardProps) => {
  const tokenIsChecked = useSubscriptionsStore((state) =>
    state.tokens.find((token) => token.id === id)
  );
  const [isChecked, setIsChecked] = useState(!!tokenIsChecked);
  const { mutate: mutateRemove } = api.token.removeToken.useMutation();
  const { mutate: mutateAdd } = api.token.addToken.useMutation();
  const removeToken = useSubscriptionsStore((state) => state.removeToken);
  const addToken = useSubscriptionsStore((state) => state.addToken);

  const handleTokenClick = () => {
    setIsChecked(!isChecked);
    if (isChecked) {
      mutateRemove({ tokenId: id });
      removeToken(id);
    }
    if (!isChecked) {
      mutateAdd({
        tokenId: id,
        tickerId: ticker,
        tokenImg: image?.large as string,
        tokenName: name,
      });
      addToken({
        id,
        name,
        ticker: ticker,
        image: image?.large as string,
      });
    }
  };

  return (
    <div
      onClick={handleTokenClick}
      data-checked={tokenIsChecked || isChecked || undefined}
      className="flex cursor-pointer items-center rounded-xl py-2.5 px-4 outline-[#5d5f62] hover:shadow-lg hover:outline data-[checked]:bg-[#3D4045]"
    >
      <div className="flex w-full items-center gap-3">
        <Image
          src={thumb ? thumb : (image?.large as string)}
          alt={name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <div className="">
          <h1 className="font-display text-base font-medium text-white">
            {name}
          </h1>
          <p className="mt-1 text-xs uppercase text-[#ffffff7a]">{ticker}</p>
        </div>
        <div className="relative ml-auto text-[#FFFBFB]">
          <input
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