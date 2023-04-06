import { Quicksand } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { RecoilRoot } from "recoil";
import { AppProps } from "@/interfaces/app";

const quicksand = Quicksand({ subsets: ["latin"] });

const MyApp = ({ Component, pageProps }: AppProps) => {
  const getLayout = Component.getLayout ?? ((page: React.ReactElement) => page);
  return (
    <div className={quicksand.className}>
      <RecoilRoot>{getLayout(<Component {...pageProps} />)}</RecoilRoot>
    </div>
  );
};

export default api.withTRPC(MyApp);
