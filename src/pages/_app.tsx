import { type AppType } from "next/app";
import { api } from "~/utils/api";
import "~/styles/globals.css";
import { RainbowConfigWrapper } from "~/components/layout/RainbowConfigWrapper";
import { Inter, Montserrat } from "@next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "~/components/layout/Layout";

const queryClient = new QueryClient();

const inter = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>
      <style jsx global>{`
        :root {
          --montserrat-font: ${montserrat.style.fontFamily};
          --inter-font: ${inter.style.fontFamily};
        }
      `}</style>
      <RainbowConfigWrapper>
        <QueryClientProvider client={queryClient}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </QueryClientProvider>
      </RainbowConfigWrapper>
    </>
  );
};

export default api.withTRPC(MyApp);
