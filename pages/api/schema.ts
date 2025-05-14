import { gql } from "apollo-server-micro";
import { JSONObject } from "./scalars";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const typeDefs = gql`
  scalar JSON

  type Query {
    dummy: String
    forecast(city: String!): JSON
  }
`;
export const resolvers = {
  JSON: JSONObject,
  Query: {
    dummy: () => "hello",
    forecast: async (_: unknown, { city }: { city: string }) => {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
      );
      if (!response.ok) {
        throw new Error("날씨 정보를 가져오는 데 실패했습니다.");
      }
      return response.json();
    },
  },
};
