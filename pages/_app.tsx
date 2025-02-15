import { BilanWrapper } from "@/components/history";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return <BilanWrapper>
    <Component {...pageProps} />
  </BilanWrapper>
}
