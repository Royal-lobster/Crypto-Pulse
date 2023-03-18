import Image from "next/image";

const StickyTokenCard = ({
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
    <div className="sticky top-5 z-50">
      <div className="min-h-[400px] w-[300px] shrink-0 rounded-xl bg-[#3D4045] py-7 shadow-xl">
        <div className="flex flex-col items-center justify-center">
          <Image
            src={image as string}
            alt={tokenName as string}
            width={88}
            height={88}
            className="h-[88px] w-[88px]"
          />
          <h1 className="mt-4 font-display text-2xl font-bold text-white">
            {tokenName}
          </h1>
        </div>
        <div className="my-6 h-[0px] w-full flex-grow border border-[#ffffff1a]" />
        <div className=" px-5">
          <div className="flex justify-between gap-6">
            <div className="">
              <h1 className="text-center font-display font-medium text-white">
                Day Highest
              </h1>
              <p className="mt-1.5 text-center font-display font-extrabold text-white">
                {dayHighest}
              </p>
            </div>
            <div className="">
              <h1 className="text-center font-display font-medium text-white">
                Day Lowest
              </h1>
              <p className="mt-1.5 text-center font-display font-extrabold text-white">
                {dayLowest}
              </p>
            </div>
          </div>
          <div className="mt-5">
            <h1 className="font-display font-medium text-white">
              Total Volume
            </h1>
            <p className="mt-1.5 font-display font-extrabold text-white">
              {totalVolume}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StickyTokenCard;
