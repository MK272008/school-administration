import { type AppType } from "next/app";
import { Quicksand } from "next/font/google";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { RecoilRoot } from "recoil";

const quicksand = Quicksand({ subsets: ["latin"] });

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={quicksand.className}>
      <RecoilRoot>
        <Component {...pageProps} />
      </RecoilRoot>
    </div>
  );
};

export default api.withTRPC(MyApp);
