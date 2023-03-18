const formatDate = (date: string | Date) => {
  const eventDate = new Date(date);

  return eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "2-digit",
  });
};

const NewsCard = ({
  title,
  link,
  date,
  description,
}: {
  title: string;
  link?: string;
  date: string | Date;
  description: string;
}) => {
  return (
    <div className="">
      <h1 className="font-display text-2xl font-semibold text-white hover:underline">
        <a href={link}>{title}</a>
      </h1>
      <p className="text-md mt-4 font-display font-normal text-[#CCCCCC]">
        {formatDate(date)}
      </p>
      <p className="text-md mt-4 font-display font-normal text-[#CCCCCC]">
        {description}
      </p>
    </div>
  );
};

export default NewsCard;
