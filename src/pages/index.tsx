import { type NextPage } from "next";
import Head from "next/head";
import AllTokens from "~/components/Landing/AllTokens";
import Hero from "~/components/Landing/Hero";
import { useCheckWeb3Token } from "~/hooks/useWeb3Token";
import { useIsMutating } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";
import { currentDate } from "~/utils/getCurrentDate";

const Home: NextPage = () => {
  const { token } = useCheckWeb3Token();
  const isFetching = useIsMutating();
  const router = useRouter();

  const { isConnected } = useAccount();

  return (
    <>
      <Head>
        <title>Create T3 App</title>
        <meta name="description" content="Generated by create-t3-app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className=" pb-32">
        {/* <h1 className="text-4xl">Total number of fetches: {isFetching}</h1> */}
        <div className="relative z-10 mx-auto mt-20 max-w-7xl">
          <div className="grid grid-cols-2 gap-20">
            <div className="col-span-2 self-center sm:col-span-1">
              <h1 className="font-inter text-5xl font-black text-white">
                <span className="block">Stay on Top of the Latest</span>
                <span className="block">Crypto health News</span>
              </h1>
              <p className="mt-8 w-2/3 font-display text-lg font-normal leading-5 text-white opacity-60">
                Subscribe to your favorite crypto tokens to get latest news on
                them everyday. No more no less!
              </p>
            </div>
            <div className="col-span-1 rounded-xl bg-[#1A1B1F] p-10 drop-shadow-xl">
              <p className="text-white opacity-60">Briefing for</p>
              <h1 className="mt-2 w-[80%] font-display text-5xl font-black text-white">
                {currentDate(Date.now())}
              </h1>
              <div className="flex justify-end">
                <button
                  onClick={() => {
                    router
                      .push("/dashboard")
                      .then(() => {
                        console.log("Navigation successful");
                      })
                      .catch((error) => {
                        console.error(error);
                      });
                  }}
                  className="cursor-pointer rounded-xl bg-[#FF5CAA] py-4 px-8 font-display text-white"
                >
                  Check the Area
                </button>
              </div>
            </div>
          </div>
          {!isConnected ? <Hero /> : <AllTokens />}
        </div>
      </main>
    </>
  );
};

export default Home;

// const AuthShowcase: React.FC = () => {
//   const { data: sessionData } = useSession();

//   const { data: secretMessage } = api.example.getSecretMessage.useQuery(
//     undefined, // no input
//     { enabled: sessionData?.user !== undefined }
//   );

//   return (
//     <div className="flex flex-col items-center justify-center gap-4">
//       <p className="text-center text-2xl text-white">
//         {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
//         {secretMessage && <span> - {secretMessage}</span>}
//       </p>
//       <button
//         className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
//         onClick={sessionData ? () => void signOut() : () => void signIn()}
//       >
//         {sessionData ? "Sign out" : "Sign in"}
//       </button>
//     </div>
//   );
// };
