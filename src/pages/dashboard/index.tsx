import Image from "next/image";
import { api } from "~/utils/api";

const currentDate = (date: string | number) => {
  const dasboardDate = new Date(date);

  const day = dasboardDate.getDate();
  const suffix =
    day >= 11 && day <= 13 ? "th" : ["st", "nd", "rd"][(day % 10) - 1] || "th";
  const formattedDate = `${day}${suffix} ${dasboardDate.toLocaleString(
    "en-US",
    {
      month: "long",
      year: "numeric",
    }
  )}`;

  return formattedDate;
};

const Dashboard = () => {
  const data = api.dashboard.getDashboardData.useQuery();

  console.log(data);

  return (
    <div className="relative z-10 mx-auto mt-20 max-w-7xl">
      <h1 className="font-inter text-5xl font-black text-white">
        Briefing for {currentDate(Date.now())}
      </h1>
      <p className="mt-8 w-[50%] font-display text-lg font-normal leading-6 text-white opacity-60">
        Briefing for your subscribed favourite tokens. Make sure to bookmark
        this page !
      </p>
      <div className="mt-20 flex items-center">
        <div className="flex w-[250px] rounded-xl border border-[#434447] py-5 px-7">
          <Image src="/images/dummy.png" alt="dummy" width={62} height={62} />
        </div>
        <div className="h-[0px] flex-grow border border-[#434447]" />
      </div>
    </div>
  );
};

export default Dashboard;
