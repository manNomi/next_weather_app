import { gql } from "apollo-server-micro";
import { JSONObject } from "./scalars";
import { weatherCache } from "./lib/fetchWeather";

export const typeDefs = gql`
  scalar JSON

  type Query {
    forecast(city: String!): JSON
  }
`;
export const resolvers = {
  JSON: JSONObject,
  Query: {
    forecast: (_: unknown, { city }: { city: string }) => {
      const cached = weatherCache[city];
      if (!cached) {
        throw new Error("해당 도시의 날씨 정보가 아직 없습니다.");
      }
      return cached;
    },
  },
};
