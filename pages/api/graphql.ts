import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import { resolvers, typeDefs } from "./schema";

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await startServer;
  await apolloServer.createHandler({ path: "/api/graphql" })(req, res);
}

export const config = {
  api: {
    bodyParser: false,
  },
};
