import { api } from "~/utils/api";
// import NewsCard from "../Card/NewsCard";

const DashboardNews = ({ id }: { id: string }) => {
  console.log(id);

  const { data, isLoading } = api.dashboard.getNewsAndStatistics.useQuery({
    tokenId: id,
  });

  console.log(isLoading);

  console.log(data);

  return <div className="box">&nbsp;</div>;
};

export default DashboardNews;
