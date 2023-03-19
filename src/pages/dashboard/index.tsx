import Image from "next/image";
import ArrowDown from "~/components/Icons/ArrowDown";
import DashboardLoader from "~/components/loader/DashboardLoader";
import { api } from "~/utils/api";
import { getCurrentDate } from "~/utils/getCurrentDate";
import { Tab } from "@headlessui/react";
import DashboardMainContent from "~/components/dashboard/DashboardMainContent";
import { useState } from "react";
import PopNewsCard from "~/components/Card/PopNewsCard";
import { type NewsDetails } from "types/news";
import Star from "~/components/Icons/Star";
import Link from "next/link";

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
      <div className="flex min-h-[calc(100vh-90px)] flex-col items-center justify-center py-32 text-white">
        <Star noAnimate />
        <h1 className="mt-5 text-center font-display text-3xl">
          No Tokens subscribed
        </h1>
        <p className="mx-auto mt-6 max-w-[400px] text-center font-display text-[#BDBDBD] ">
          We have looked far but no AI yet to read your mind :/ Subscribe to any
          crypto tokens{" "}
          <Link href="/">
            <p className="inline text-[#FF5CAA] underline">here</p>
          </Link>{" "}
          so we know what to show here 😉
        </p>
      </div>
    );

  return (
    <>
      <Tab.Group defaultIndex={0}>
        <div className="relative z-10 mx-auto mt-10 px-6 sm:px-8 md:mt-20 md:px-10 xl:max-w-7xl">
          <h1 className="font-inter text-2xl font-black text-white sm:text-3xl md:text-5xl">
            Briefing for {getCurrentDate(Date.now())}
          </h1>
          <p className="mt-5 w-full font-display text-base font-normal leading-6 text-white opacity-60 sm:w-3/4 md:mt-8 md:w-[60%] md:text-lg xl:w-[50%]">
            Briefing for your subscribed favourite tokens. Make sure to bookmark
            this page !
          </p>
        </div>
        <div className="fixed top-1/2 hidden -translate-y-1/2 flex-col items-center justify-center rounded-xl border border-[#434447] py-5 lg:right-[20px] lg:flex xl:right-[50px] ">
          <div className="flex flex-col items-center justify-center gap-4 px-2.5 pt-5 text-[#ffffff7a]">
            <div className="rotate-[270deg] text-xs uppercase">
              <p>GO TO</p>
            </div>
            <ArrowDown />
          </div>
          <div className="mt-3 h-[1px] w-full flex-grow bg-[#434447]" />
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
                <div className="relative z-10 mx-auto mt-10 flex items-center px-6 sm:px-8 md:px-10 lg:mt-20 lg:pr-[100px] xl:max-w-7xl xl:pr-[70px]">
                  <div className="flex gap-3 rounded-xl border border-[#434447] py-3 px-10 pl-4">
                    <Image
                      src={subscribedToken.image}
                      alt={subscribedToken.name}
                      width={48}
                      height={48}
                      className="h-[48px] w-[48px] rounded-full"
                    />
                    <div className="flex-grow items-center">
                      <h1 className="font-display text-base font-medium text-white">
                        {subscribedToken.name}
                      </h1>
                      <p className="mt-1 text-xs uppercase text-[#ffffff7a]">
                        {subscribedToken.ticker}
                      </p>
                    </div>
                  </div>
                  <div className="h-[1px] flex-grow bg-[#434447]" />
                </div>
                <DashboardMainContent
                  tokenName={subscribedToken.name}
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
