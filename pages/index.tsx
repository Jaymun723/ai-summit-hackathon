import { Bilan } from "@/components/bilan";
import { Window } from "@/components/window";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>CarbonEvents</title>
        <meta name="description" content="Estimate the carbon footprint of your events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="container is-fullhd section">

        <div className="columns">
          <div className="column is-three-quarters">
            <h1 className="title">CarbonEvents</h1>
            <Window />
          </div>
          <div className="column">
            <Bilan />
          </div>
        </div>
      </div>
    </>
  );
}
