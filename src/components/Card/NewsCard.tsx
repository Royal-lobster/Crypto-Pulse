import { type NewsDetails } from "types/news";
import ForwardArrow from "../Icons/ForwardArrow";

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
  newsImage,
  setIsOpen,
  handleNewsClick,
  id,
}: {
  id: string;
  title: string;
  link?: string;
  date: string | Date;
  description: string;
  newsImage: string;
  setIsOpen: (open: boolean) => void;
  handleNewsClick: (news: NewsDetails) => void;
}) => {
  return (
    <div className="">
      <h1 className="font-display text-xl font-semibold text-white hover:underline md:text-2xl">
        <a href={link} className="block w-full">
          {title}
        </a>
      </h1>
      <p className="text-md mt-4 font-display font-normal text-[#CCCCCC]">
        {formatDate(date)}
      </p>
      <p className="text-md mt-4 font-display font-normal text-[#CCCCCC]">
        {description}
      </p>
      <button
        className="mt-4 flex items-center gap-2.5 text-[#FF5CAA] hover:underline"
        onClick={() => {
          setIsOpen(true);
          handleNewsClick({
            image: newsImage,
            id,
            date,
            title,
            description,
          });
        }}
      >
        Read Condensed
        <ForwardArrow />
      </button>
    </div>
  );
};

export default NewsCard;
