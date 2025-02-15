import { Window } from "@/components/window";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>FestiCarbon</title>
        <meta name="description" content="Estimate the carbon footprint of your parties." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container section">

        <div className="columns">
          <div className="column is-three-quarters">
            <h1 className="title">FestiCarbon</h1>
            <Window />
          </div>
          <div className="column">

          </div>

        </div>
      </div>
    </>
  );
}
