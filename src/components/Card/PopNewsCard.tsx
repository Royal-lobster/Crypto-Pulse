import { Dialog } from "@headlessui/react";
import { useCallback, useEffect, useState } from "react";
import { type NewsDetails } from "types/news";
import { isDataView } from "util/types";
import { api } from "~/utils/api";
import { getCurrentDate } from "~/utils/getCurrentDate";
import Calendar from "../Icons/Calendar";
import ForwardArrow from "../Icons/ForwardArrow";
import Star from "../Icons/Star";

const PopNewsCardLoader = () => {
  return (
    <div className="flex flex-col items-center justify-center py-8 text-[#8C8C8C]">
      <Star />
      <p className="mt-2 font-display text-sm">
        <span className="block text-center">Generating </span>
        <span className="block text-center">Condensed Version</span>
      </p>
    </div>
  );
};

const PopNewsCard = ({
  isOpen,
  setIsOpen,
  newsDetails,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  newsDetails: NewsDetails;
}) => {
  const { mutateAsync, isLoading } =
    api.dashboard.getCondensedNews.useMutation();

  console.log(isLoading);

  const [data, setData] = useState<string | null>();

  const handleNewsFetch = useCallback(async () => {
    const data = await mutateAsync({
      newsId: newsDetails.id,
    });

    setData(data);
  }, [newsDetails, mutateAsync]);

  useEffect(() => {
    void handleNewsFetch();
  }, [handleNewsFetch]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/80" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative min-h-[600px] w-[600px] overflow-hidden rounded-2xl bg-[#27282C]">
          <div className="relative h-[250px]">
            <button className="absolute top-5 left-5 h-9 w-9 shadow-lg"></button>
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#27282c3a] via-[#27282c3a] to-[#27282C]"></div>
            <div
              className="absolute inset-0 z-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${newsDetails.image})` }}
            ></div>
          </div>
          <div className="relative z-30 -mt-10 px-12">
            <h1 className="font-display text-2xl font-semibold text-white">
              Top Crypto Trader Issues Bitcoin Warning, Says BTC Flashing Vibes
              of March 2020 Meltdown
            </h1>
            <div className="mt-5 flex items-center gap-2.5 text-[#CCCCCC]">
              <Calendar />
              <p className="mt-0.5 font-display text-sm">
                Published on {getCurrentDate(Date.now())}
              </p>
            </div>
            {isLoading && <PopNewsCardLoader />}
            {!isLoading && data && (
              <div className="pt-5">
                <p className="font-display text-sm text-white">
                  Pseudonymous analyst Kaleo tells his 566,300 Twitter followers
                  that Bitcoin is currently consolidating above a diagonal
                  trendline after taking it out earlier this year. According to
                  the trader, the price action is reminiscent of how Bitcoin
                  moved in early 2020 when it rallied from around $6,000 to
                  $10,000 only to capitulate back to $3,000 in March of the same
                  year.
                </p>
              </div>
            )}
            {!data && null}
            <button
              className="mt-5 flex items-center gap-2.5 text-[#FF5CAA]"
              onClick={() => {
                setIsOpen(false);
              }}
            >
              <span className="-mt-0.5">Read Full Version</span>
              <ForwardArrow />
            </button>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PopNewsCard;
