import { BilanWrapper } from "@/components/bilan";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <BilanWrapper>
    <Component {...pageProps} />;
  </BilanWrapper>
}
