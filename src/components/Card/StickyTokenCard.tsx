import Image from "next/image";
import { numFormatter } from "~/utils/numberFormatter";

interface StickyTokenCardProps {
  image?: string;
  tokenName?: string;
  totalVolume?: number;
  dayHighest?: number;
  dayLowest?: number;
}

const StickyTokenCard = ({
  image,
  tokenName,
  totalVolume,
  dayHighest,
  dayLowest,
}: StickyTokenCardProps) => {
  return (
    <div className="static top-5 z-50 lg:sticky">
      <div className="flex shrink-0 rounded-xl bg-[#3D4045] pl-5 shadow-xl md:px-10 lg:block lg:min-h-[400px] lg:w-[300px] lg:py-7 lg:px-0">
        <div className="flex flex-col items-center justify-center border-r border-[#ffffff1a] py-7 pr-5 md:pr-20 lg:py-0 lg:pr-0">
          <Image
            src={image as string}
            alt={tokenName as string}
            width={88}
            height={88}
            className="h-[88px] w-[88px] rounded-full"
          />
          <h1 className="mt-4 font-display text-xl font-bold text-white lg:text-2xl ">
            {tokenName}
          </h1>
        </div>
        <div className="my-6 hidden h-[0px] w-full flex-grow border border-[#ffffff1a]  lg:block lg:flex-grow-0 " />
        <div className="px-5 py-7 lg:py-0">
          <div className="flex flex-col justify-between gap-6 md:flex-row">
            <div className="">
              <h1 className="font-display text-sm font-medium text-white md:text-center md:text-base">
                Day Highest
              </h1>
              <p className="mt-1.5 font-display text-sm font-extrabold text-white md:text-base">
                ${dayHighest?.toFixed(2).toLocaleString()}
              </p>
            </div>
            <div className="">
              <h1 className="font-display text-sm font-medium text-white md:text-center md:text-base">
                Day Lowest
              </h1>
              <p className="mt-1.5 font-display text-sm font-extrabold text-white md:text-base">
                ${dayLowest?.toFixed(2).toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="font-display text-sm font-medium text-white md:text-base">
              Total Volume
            </h1>
            <p className="mt-1.5 font-display text-sm font-extrabold text-white md:text-base">
              ${numFormatter(totalVolume as number)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyTokenCard;
