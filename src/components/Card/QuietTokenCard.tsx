import Image from "next/image";
import { numFormatter } from "~/utils/numberFormatter";

const QuietTokensCard = ({
  image,
  tokenName,
  totalVolume,
  dayHighest,
  dayLowest,
}: {
  image?: string;
  tokenName?: string;
  totalVolume?: number;
  dayHighest?: number;
  dayLowest?: number;
}) => {
  return (
    <div className="flex shrink-0 rounded-xl bg-[#3D4045] pl-5 shadow-xl">
      <div className="flex flex-col items-center justify-center border-r border-[#ffffff1a] py-7 pr-5">
        <Image
          src={image as string}
          alt={tokenName as string}
          width={88}
          height={88}
          className="h-[88px] w-[88px] rounded-full"
        />
        <h1 className="text-md mt-4 text-center font-display font-bold text-white lg:text-xl ">
          {tokenName}
        </h1>
      </div>
      <div className="self-center px-5 py-7">
        <div className="flex flex-col justify-between gap-6 md:flex-row">
          <div className="">
            <h1 className="font-display text-sm font-medium text-white ">
              Day Highest
            </h1>
            <p className="mt-1.5 font-display text-sm font-extrabold text-white ">
              ${dayHighest?.toFixed(2).toLocaleString()}
            </p>
          </div>
          <div className="">
            <h1 className="font-display text-sm font-medium text-white ">
              Day Lowest
            </h1>
            <p className="mt-1.5 font-display text-sm font-extrabold text-white ">
              ${dayLowest?.toFixed(2).toLocaleString()}
            </p>
          </div>
        </div>
        <div className="mt-5">
          <h1 className="font-display text-sm font-medium text-white ">
            Total Volume
          </h1>
          <p className="mt-1.5 font-display text-sm font-extrabold text-white ">
            ${numFormatter(totalVolume as number)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuietTokensCard;
