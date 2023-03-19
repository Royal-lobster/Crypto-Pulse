import { type News } from "@prisma/client";
import { type NewsDetails } from "types/news";
import NewsCard from "../Card/NewsCard";

const DashboardNews = ({
  news,
  setIsOpen,
  handleNewsClick,
}: {
  news: News[];
  setIsOpen: (open: boolean) => void;
  handleNewsClick: (news: NewsDetails) => void;
}) => {
  return (
    <div className="grid gap-5">
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
