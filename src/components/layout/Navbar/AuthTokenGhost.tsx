import { useEffect } from "react";
import { useWeb3Token } from "~/hooks/useWeb3Token";

const AuthTokenGhost = ({
  setIsClicked,
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setIsClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { error, token } = useWeb3Token();

  useEffect(() => {
    if (error || token) {
      setIsOpen(false);
      setIsClicked(false);
    }
  }, [error, setIsClicked, token, setIsOpen]);

  return null;
};

export default AuthTokenGhost;
