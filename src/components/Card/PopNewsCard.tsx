import { Dialog } from "@headlessui/react";
import { useCallback, useEffect } from "react";
import { type NewsDetails } from "types/news";
import { api } from "~/utils/api";

const PopNewsCard = ({
  isOpen,
  setIsOpen,
  newsDetails,
}: {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  newsDetails: NewsDetails;
}) => {
  const { mutateAsync, isLoading } =
    api.dashboard.getCondensedNews.useMutation();

  const handleNewsFetch = useCallback(async () => {
    const data = await mutateAsync({
      newsId: newsDetails.id,
    });

    console.log(data);
  }, [newsDetails, mutateAsync]);

  useEffect(() => {
    void handleNewsFetch();
  }, [handleNewsFetch]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="relative min-h-[600px] w-[600px] overflow-hidden rounded-2xl bg-[#27282C]">
          <div className="relative h-[250px]">
            <div className="absolute inset-0 z-20 bg-gradient-to-b from-[#27282c3a] via-[#27282c3a] to-[#27282C]"></div>
            <div
              className="absolute inset-0  z-10 bg-cover bg-center"
              style={{ backgroundImage: `url(${newsDetails.image})` }}
            ></div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PopNewsCard;
