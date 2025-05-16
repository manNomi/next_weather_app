import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer, gql } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";

const API_KEY = process.env.OPENWEATHER_API_KEY;

const JSONObject = new GraphQLScalarType({
  name: "JSON",
  description: "Arbitrary JSON",
  parseValue: (value) => value,
  serialize: (value) => value,
  parseLiteral: (ast) =>
    ast.kind === Kind.STRING ? JSON.parse(ast.value) : null,
});

const typeDefs = gql`
  scalar JSON

  type Query {
    forecast(city: String!): JSON
  }
`;
const resolvers = {
  JSON: JSONObject,
  Query: {
    forecast: async (_: unknown, { city }: { city: string }) => {
      const data = await fetchWeather(city);
      return data;
    },
  },
};

const apolloServer = new ApolloServer({ typeDefs, resolvers });
const startServer = apolloServer.start();

export const fetchWeather = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
  );
  if (response.ok) {
    await response.json();
  } else {
    console.error(`${city} 날씨 정보 갱신 실패`);
  }
};

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
