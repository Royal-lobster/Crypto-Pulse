import Star from "../Icons/Star";

const DashboardLoader = () => {
  return (
    <div className="flex min-h-[calc(100vh-300px)] flex-col items-center justify-center text-[#8C8C8C]">
      <Star />
      <p className="mt-2 font-display text-2xl">Fetching Data</p>
    </div>
  );
};

export default DashboardLoader;
