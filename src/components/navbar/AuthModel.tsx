import React, { useEffect } from "react";
import { useWeb3Token } from "~/hooks/useWeb3Token";

const AuthModel = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <div className="absolute top-0 left-0 z-50 h-screen w-screen">
      <div className="absolute left-0 top-0 z-0 h-screen w-screen bg-black opacity-50" />
      <div className="absolute left-1/2 top-1/2 z-10 flex w-[450px] -translate-y-1/2 -translate-x-1/2 flex-col items-center justify-center rounded-xl bg-[#27282C]  px-[30px] py-[40px]">
        <h1 className="text-center font-inter font-bold text-white">
          Authenticate your Wallet
        </h1>
        <p className="mt-7 text-center font-inter font-normal text-white">
          Verify your wallet to continue using the app. Click on verify button
          to get signature request.
        </p>
        <button
          className="mt-10 cursor-pointer rounded-md bg-[#FF5CAA] py-2.5 px-10 font-display text-white"
          onClick={() => setIsClicked(true)}
        >
          Verify
        </button>
        {isClicked && <AuthTokenGhost setIsClicked={setIsClicked} />}
      </div>
    </div>
  );
};

const AuthTokenGhost = ({
  setIsClicked,
}: {
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { error, token } = useWeb3Token();

  useEffect(() => {
    if (error || token) setIsClicked(false);
  }, [error, setIsClicked, token]);

  return null;
};

export default AuthModel;
