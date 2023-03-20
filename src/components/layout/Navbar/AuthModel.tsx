import React, { useEffect } from "react";
import dynamic from "next/dynamic";
import { Dialog } from "@headlessui/react";

const AuthModel = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  const AuthTokenGhost = dynamic(() => import("./AuthTokenGhost"), {
    ssr: false,
  });

  return (
    <Dialog
      open={isOpen}
      onClose={() => setIsOpen(false)}
      className="relative z-50"
    >
      <div className="fixed inset-0 bg-black/60" aria-hidden="true" />
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="z-10 flex w-[450px] flex-col items-center justify-center rounded-xl bg-[#27282C] px-[30px] py-[40px]">
          <h1 className="text-center font-inter text-2xl font-bold text-white">
            Authenticate your Wallet
          </h1>
          <p className="mt-7 text-center font-inter font-normal text-white">
            Verify your wallet to continue using the app. Click on verify button
            to get signature request.
          </p>
          <button
            className="mt-10 cursor-pointer rounded-md bg-[#FF5CAA] py-2.5 px-10 font-display text-white"
            onClick={() => {
              setIsClicked(true);
            }}
          >
            Verify
          </button>
          {isClicked && (
            <AuthTokenGhost setIsOpen={setIsOpen} setIsClicked={setIsClicked} />
          )}
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default AuthModel;
