import Image from "next/image";
import NewsCard from "~/components/Card/NewsCard";
import StickyTokenCard from "~/components/Card/StickyTokenCard";
import ArrowDown from "~/components/Icons/ArrowDown";
import DashboardLoader from "~/components/loader/DashboardLoader";
import { api } from "~/utils/api";
import { currentDate } from "~/utils/getCurrentDate";
import { Tab } from "@headlessui/react";

const Dashboard = () => {
  const { isLoading, data } = api.dashboard.getDashboardData.useQuery();
  const { data: userData, isLoading: userIsLoading } =
    api.user.getUser.useQuery();

  if (isLoading && !data) return <DashboardLoader />;

  console.log(data);

  return (
    <>
      <div className="relative z-10 mx-auto mt-20 max-w-7xl">
        <h1 className="font-inter text-5xl font-black text-white">
          Briefing for {currentDate(Date.now())}
        </h1>
        <p className="mt-8 w-[50%] font-display text-lg font-normal leading-6 text-white opacity-60">
          Briefing for your subscribed favourite tokens. Make sure to bookmark
          this page !
        </p>
      </div>
      <Tab.Group defaultIndex={1}>
        <div className="absolute left-[50px] flex flex-col items-center justify-center  rounded-xl border border-[#434447] py-5 ">
          <div className="flex flex-col items-center justify-center gap-4 px-2.5 pt-5 text-[#ffffff7a]">
            <div className="rotate-[270deg] text-xs uppercase">
              <p>GO TO</p>
            </div>
            <ArrowDown />
          </div>
          <div className=" mt-3 h-[0px] w-full flex-grow border border-[#434447]" />
          <Tab.List>
            <div className="flex flex-col gap-3 px-2.5 pt-4">
              <Tab>
                <Image
                  src="/images/dummy.png"
                  alt="dummy"
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px]"
                />
              </Tab>
              <Tab>
                <Image
                  src="/images/dummy.png"
                  alt="dummy"
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px]"
                />
              </Tab>
              <Tab>
                <Image
                  src="/images/dummy.png"
                  alt="dummy"
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px]"
                />
              </Tab>
              <Tab>
                <Image
                  src="/images/dummy.png"
                  alt="dummy"
                  width={36}
                  height={36}
                  className="h-[36px] w-[36px]"
                />
              </Tab>
            </div>
          </Tab.List>
        </div>
      </Tab.Group>
    </>
  );
};

{
  /* <div className="relative z-10 mx-auto mt-20 flex  max-w-7xl items-center">
        <div className="flex w-[250px] gap-4 rounded-xl border border-[#434447] py-5 px-7">
          <Image
            src="/images/dummy.png"
            alt="dummy"
            width={48}
            height={48}
            className="h-[48px] w-[48px]"
          />
          <div className="items-center">
            <h1 className="font-display text-base font-medium text-white">
              Bitcoin
            </h1>
            <p className="mt-1 text-xs uppercase text-[#ffffff7a]">BTC</p>
          </div>
        </div>
        <div className="h-[0px] flex-grow border border-[#434447]" />
      </div>
      <div className="relative mt-16 h-[200vh] pb-20">
        <div className="absolute left-[50px] flex flex-col items-center justify-center  rounded-xl border border-[#434447] py-5 ">
          <div className="flex flex-col items-center justify-center gap-4 px-2.5 pt-5 text-[#ffffff7a]">
            <div className="rotate-[270deg] text-xs uppercase">
              <p>GO TO</p>
            </div>
            <ArrowDown />
          </div>
          <div className=" mt-3 h-[0px] w-full flex-grow border border-[#434447]" />
          <div className="flex flex-col gap-3 px-2.5 pt-4">
            <Image
              src="/images/dummy.png"
              alt="dummy"
              width={36}
              height={36}
              className="h-[36px] w-[36px]"
            />
            <Image
              src="/images/dummy.png"
              alt="dummy"
              width={36}
              height={36}
              className="h-[36px] w-[36px]"
            />
            <Image
              src="/images/dummy.png"
              alt="dummy"
              width={36}
              height={36}
              className="h-[36px] w-[36px]"
            />
            <Image
              src="/images/dummy.png"
              alt="dummy"
              width={36}
              height={36}
              className="h-[36px] w-[36px]"
            />
          </div>
        </div>

        <div className="z-10 mx-auto mt-20 flex max-w-7xl gap-[50px] pl-[70px] pb-20">
          <div className="grid gap-10">
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
            <NewsCard />
          </div>
          <div className="relative">
            <StickyTokenCard />
          </div>
        </div>
      </div> */
}

export default Dashboard;
