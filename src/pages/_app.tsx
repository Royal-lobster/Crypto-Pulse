import { type AppType } from "next/app";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import { RainbowConfigWrapper } from "~/components/layout/RainbowConfigWrapper";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <RainbowConfigWrapper>
      <Component {...pageProps} />
    </RainbowConfigWrapper>
  );
};

export default api.withTRPC(MyApp);
