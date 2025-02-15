import Head from "next/head";
import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";
import styles from "@/styles/Home.module.css";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export default function Home() {
  return (
    <>
      <Head>
        <title>FestiCarbon</title>
        <meta name="description" content="Estimate the carbon footprint of your parties." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container">

      <div className="columns">
        <div className="column is-three-quarters">
          <h1 className="title">FestiCarbon</h1>
          <div className="box"></div>
        </div>
        <div className="column">

        </div>

      </div>
      </div>
    </>
  );
}
