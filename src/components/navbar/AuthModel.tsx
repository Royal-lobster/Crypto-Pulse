import React, { useEffect } from "react";
import { useWeb3Token } from "~/hooks/useWeb3Token";

const AuthModel = () => {
  const [isClicked, setIsClicked] = React.useState(false);
  return (
    <div>
      <div className="absolute left-0 top-0 z-0 h-screen w-screen bg-black opacity-50"></div>
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2  bg-gray-600">
        <h1>Authenticate your Wallet</h1>
        <p>
          Verify your wallet to continue using the app. Click on verify button
          to get signature request.
        </p>
        <button onClick={() => setIsClicked(true)}>Verify</button>
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
  const { error } = useWeb3Token();

  useEffect(() => {
    if (error) setIsClicked(false);
  }, [error, setIsClicked]);

  return null;
};

export default AuthModel;
