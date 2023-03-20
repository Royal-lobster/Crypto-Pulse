import Image from "next/image";
import ArrowDown from "~/components/Icons/ArrowDown";
import DashboardLoader from "~/components/loader/DashboardLoader";
import { api } from "~/utils/api";
import { getCurrentDate } from "~/utils/getCurrentDate";
import DashboardMainContent from "~/components/dashboard/DashboardMainContent";
import { useRef, useState } from "react";
import PopNewsCard from "~/components/Card/PopNewsCard";
import { type NewsDetails } from "types/news";
import Star from "~/components/Icons/Star";
import Link from "next/link";

const Dashboard = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [newsDetails, setNewsDetails] = useState<NewsDetails>();
  const { isLoading: tokensIsLoading, data: userSubsribedTokens } =
    api.dashboard.getUserSubscribedTokens.useQuery();
  const [currentView, setCurrentView] = useState<string>();

  const subscribedTokenRefs = useRef<{ [key: string]: HTMLDivElement }>({});

  const { data: newsData, isLoading } =
    api.dashboard.getNewsAndStatistics.useQuery();

  console.log(newsData);

  const handleNewsClick = (newsDetails: NewsDetails) => {
    setNewsDetails(newsDetails);
  };

  if (tokensIsLoading && !userSubsribedTokens && isLoading && !newsData)
    return <DashboardLoader />;

  if (userSubsribedTokens?.length === 0 || (!userSubsribedTokens && !isLoading))
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
      <div className="relative z-10 mx-auto mt-10 w-full px-0 sm:px-8 md:mt-20 md:px-10 xl:max-w-7xl xl:px-0">
        <h1 className="font-inter text-2xl font-black text-white sm:text-3xl md:text-5xl">
          Briefing for {getCurrentDate(Date.now())}
        </h1>
        <p className="mt-5 w-full font-display text-base font-normal leading-6 text-white opacity-60 sm:w-3/4 md:mt-8 md:w-[60%] md:text-lg xl:w-[50%]">
          Briefing for your subscribed favourite tokens. Make sure to bookmark
          this page !
        </p>
      </div>

      <div className="mx-0 mt-10 flex items-center gap-4 rounded-xl border border-[#434447] pl-8 pr-3 sm:mx-8 md:mx-10 lg:fixed lg:top-1/2 lg:right-[20px] lg:mt-0 lg:flex lg:-translate-y-1/2 lg:flex-col lg:justify-center lg:gap-0 lg:py-5 lg:px-0 lg:pr-0 xl:right-[50px] xl:mx-0">
        <div className="flex flex-shrink-0 items-center justify-center gap-4 py-2.5  text-[#ffffff7a] lg:flex-col  lg:px-2.5 lg:pt-5">
          <div className="self-center text-xs uppercase lg:rotate-[270deg]">
            <p>GO TO</p>
          </div>
          <span className="hidden lg:block">
            <ArrowDown />
          </span>
        </div>
        <div className="mt-3 hidden h-[1px] w-full flex-grow bg-[#434447] lg:block" />
        <div className="flex justify-center gap-3 overflow-scroll border-l border-[#434447] py-2.5 pl-3 lg:flex-col lg:justify-start lg:overflow-hidden lg:border-l-0 lg:py-0 lg:px-2.5 lg:pl-2.5 lg:pt-4">
          {userSubsribedTokens?.map((subscribedToken) => (
            <button
              key={subscribedToken.id}
              className="flex-shrink-0 cursor-pointer"
              onClick={() => {
                if (subscribedToken) {
                  setCurrentView(subscribedToken.id);
                  if (subscribedTokenRefs.current[subscribedToken.id]) {
                    subscribedTokenRefs.current[
                      subscribedToken?.id
                    ]?.scrollIntoView({ behavior: "smooth" });
                  }
                }
              }}
            >
              <Image
                src={subscribedToken.image}
                alt={subscribedToken.id}
                width={36}
                height={36}
                className="h-[36px] w-[36px] rounded-full"
              />
            </button>
          ))}
        </div>
      </div>

      {newsData?.map((tokenData, i) => {
        return (
          <div
            key={`${tokenData?.id}-${i}`}
            id={tokenData?.id}
            ref={(ref) => {
              if (ref && tokenData) {
                subscribedTokenRefs.current[tokenData?.id] = ref;
              }
            }}
            className={currentView === tokenData?.id ? "active" : ""}
          >
            <div className="relative z-10 mx-auto mt-10 flex items-center px-0 sm:px-8 md:px-10 lg:mt-20 lg:pr-[100px] xl:max-w-7xl xl:pr-[70px] xl:pl-0">
              <div className="flex gap-3 rounded-xl border border-[#434447] py-3 px-10 pl-4">
                <Image
                  src={tokenData?.image}
                  alt={tokenData?.name}
                  width={48}
                  height={48}
                  className="h-[48px] w-[48px] rounded-full"
                />
                <div className="flex-grow items-center">
                  <h1 className="font-display text-base font-medium text-white">
                    {tokenData.name}
                  </h1>
                  <p className="mt-1 text-xs uppercase text-[#ffffff7a]">
                    {tokenData.ticker}
                  </p>
                </div>
              </div>
              <div className="h-[1px] flex-grow bg-[#434447]" />
            </div>
            <DashboardMainContent
              news={tokenData.news}
              tokenName={tokenData.name}
              tokenImage={tokenData.image}
              tokenId={tokenData.id}
              setIsOpen={setIsOpen}
              stats={tokenData.Statistics}
              handleNewsClick={handleNewsClick}
            />
          </div>
        );
      })}

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
