import { History } from "@/components/history";
import { Metrics } from "@/components/metrics";
import { Window } from "@/components/window";
import Head from "next/head";
import styled from "styled-components";

const Grid = styled.div`
  padding: 20px;
  display: grid;
  grid-gap: 30px;
  height: 100vh;
  grid-template-columns:  1fr minmax(300px, 800px) minmax(300px, 400px) 1fr;
  grid-template-rows: 20px minmax(300px, 75%) 250px 1fr;
  grid-template-areas: 
  ". title  metrics ."
  ". chat  metrics ."
  ". chat  history ."
  ". input history .";
`


const Title = styled.h1`
  grid-area: title;
`

export default function Home() {
  return (
    <>
      <Head>
        <title>CarbonEvents</title>
        <meta name="description" content="Estimate the carbon footprint of your events." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Grid>
        <Title className="title">CarbonEvents</Title>
        <Window />
        <Metrics />
        <History />
      </Grid>
    </>
  )
}
