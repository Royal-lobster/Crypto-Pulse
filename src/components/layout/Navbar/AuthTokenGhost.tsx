import { useEffect } from "react";
import { useWeb3Token } from "~/hooks/useWeb3Token";

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

export default AuthTokenGhost;
