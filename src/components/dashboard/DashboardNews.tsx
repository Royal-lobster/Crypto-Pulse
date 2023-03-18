import { type News } from "@prisma/client";
import NewsCard from "../Card/NewsCard";

const DashboardNews = ({ news }: { news: News[] }) => {
  return (
    <div className="grid gap-5">
      {news.map((dashboardNews) => (
        <NewsCard
          key={dashboardNews.id}
          title={dashboardNews.title}
          date={dashboardNews.createdAt}
          description={dashboardNews.description as string}
        />
      ))}
    </div>
  );
};

export default DashboardNews;
