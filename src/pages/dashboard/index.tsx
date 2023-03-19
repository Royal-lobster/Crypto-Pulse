import Image from "next/image";
import ArrowDown from "~/components/Icons/ArrowDown";
import DashboardLoader from "~/components/loader/DashboardLoader";
import { api } from "~/utils/api";
import { currentDate } from "~/utils/getCurrentDate";
import { Tab } from "@headlessui/react";
import DashboardMainContent from "~/components/dashboard/DashboardMainContent";
import { useState } from "react";
import PopNewsCard from "~/components/Card/PopNewsCard";
import { type NewsDetails } from "types/news";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newsDetails, setNewsDetails] = useState<NewsDetails>();
  const { isLoading: tokensIsLoading, data: userSubsribedTokens } =
    api.dashboard.getUserSubscribedTokens.useQuery();

  const handleNewsClick = (newsDetails: NewsDetails) => {
    setNewsDetails(newsDetails);
  };

  if (tokensIsLoading && !userSubsribedTokens) return <DashboardLoader />;

  if (userSubsribedTokens?.length === 0)
    return (
      <div className="flex min-h-[calc(100vh-90px)] flex-col items-center justify-center text-[#8C8C8C]">
        <p className="mt-2 font-display text-2xl">No Data Found</p>
      </div>
    );

  return (
    <>
      <Tab.Group defaultIndex={0}>
        <div className="relative z-10 mx-auto mt-20 max-w-7xl">
          <h1 className="font-inter text-5xl font-black text-white">
            Briefing for {currentDate(Date.now())}
          </h1>
          <p className="mt-8 w-[50%] font-display text-lg font-normal leading-6 text-white opacity-60">
            Briefing for your subscribed favourite tokens. Make sure to bookmark
            this page !
          </p>
        </div>
        <div className="absolute top-1/2 left-[50px] flex flex-col items-center justify-center  rounded-xl border border-[#434447] py-5 ">
          <div className="flex flex-col items-center justify-center gap-4 px-2.5 pt-5 text-[#ffffff7a]">
            <div className="rotate-[270deg] text-xs uppercase">
              <p>GO TO</p>
            </div>
            <ArrowDown />
          </div>
          <div className=" mt-3 h-[0px] w-full flex-grow border border-[#434447]" />
          <Tab.List>
            <div className="flex flex-col gap-3 px-2.5 pt-4">
              {userSubsribedTokens?.map((subsribedToken) => (
                <Tab key={subsribedToken.id}>
                  <Image
                    src={subsribedToken.image}
                    alt={subsribedToken.id}
                    width={36}
                    height={36}
                    className="h-[36px] w-[36px] rounded-full"
                  />
                </Tab>
              ))}
            </div>
          </Tab.List>
        </div>
        <Tab.Panels>
          {userSubsribedTokens?.map((subscribedToken, i) => {
            return (
              <Tab.Panel key={`${subscribedToken.id}-${i}`}>
                <div className="relative z-10 mx-auto mt-20 flex  max-w-7xl items-center">
                  <div className="flex gap-3 rounded-xl border border-[#434447] py-3 px-10 pl-4">
                    <Image
                      src={subscribedToken.image}
                      alt={subscribedToken.ticker}
                      width={48}
                      height={48}
                      className="h-[48px] w-[48px] rounded-full"
                    />
                    <div className="flex-grow items-center">
                      <h1 className="font-display text-base font-medium text-white">
                        {subscribedToken.id}
                      </h1>
                      <p className="mt-1 text-xs uppercase text-[#ffffff7a]">
                        {subscribedToken.ticker}
                      </p>
                    </div>
                  </div>
                  <div className="h-[0px] flex-grow border border-[#434447]" />
                </div>
                <DashboardMainContent
                  tokenImage={subscribedToken.image}
                  tokenId={subscribedToken.id}
                  setIsOpen={setIsOpen}
                  handleNewsClick={handleNewsClick}
                />
              </Tab.Panel>
            );
          })}
        </Tab.Panels>
      </Tab.Group>
      {newsDetails && (
        <PopNewsCard
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          newsDetails={newsDetails}
        />
      )}
    </>
  );
};

export default Dashboard;
