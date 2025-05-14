import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import { resolvers, typeDefs } from "./schema";
import { fetchWeather } from "./lib/fetchWeather";

const cities = ["Seoul", "Tokyo", "Paris"];

let pollingInitialized = false;
async function initPolling() {
  if (pollingInitialized) return;

  pollingInitialized = true;
  for (const city of cities) {
    await fetchWeather(city);
  }
  setInterval(async () => {
    for (const city of cities) {
      await fetchWeather(city);
    }
  }, 10 * 60 * 1000);
}

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await initPolling();
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
