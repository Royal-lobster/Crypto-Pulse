import { type Coin } from "types/coin";
import TokenCard from "../tokenCard/TokenCard";

const TokenList = ({ data }: { data?: Coin[] }) => {
  return (
    <>
      <div className="mt-14 grid grid-cols-4 gap-5">
        {data?.map(
          (token) =>
            token.image && (
              <TokenCard
                id={token.id}
                key={token.id}
                image={token.image}
                name={token.name}
                symbol={token.symbol}
              />
            )
        )}
      </div>
    </>
  );
};

export default TokenList;
