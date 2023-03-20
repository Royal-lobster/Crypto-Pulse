import { type News } from "@prisma/client";
import { type NewsDetails } from "types/news";
import NewsCard from "../Card/NewsCard";
import Star from "../Icons/Star";

const DashboardNews = ({
  news,
  setIsOpen,
  handleNewsClick,
}: {
  news: News[];
  setIsOpen: (open: boolean) => void;
  handleNewsClick: (news: NewsDetails) => void;
}) => {
  if (!news)
    return (
      <>
        <div className="flex flex-col items-center justify-center py-32 text-white">
          <Star noAnimate />
          <h1 className="mt-5 text-center font-display text-3xl">
            No news yet!
          </h1>
          <p className="mx-auto mt-6 max-w-[360px] text-center font-display text-[#BDBDBD] ">
            Please check back later, thanks.
          </p>
        </div>
      </>
    );

  return (
    <div className="grid gap-8">
      {news.map((dashboardNews) => (
        <NewsCard
          key={dashboardNews.id}
          id={dashboardNews.id}
          title={dashboardNews.title}
          date={dashboardNews.createdAt}
          description={dashboardNews.description as string}
          newsImage={dashboardNews.image as string}
          setIsOpen={setIsOpen}
          handleNewsClick={handleNewsClick}
        />
      ))}
    </div>
  );
};

export default DashboardNews;
