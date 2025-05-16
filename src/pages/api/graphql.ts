import type { NextApiRequest, NextApiResponse } from "next";
import { ApolloServer } from "apollo-server-micro";
import { GraphQLScalarType, Kind } from "graphql";
import fetch from "node-fetch"; // if needed for fetch on Node.js

import { gql } from "apollo-server-micro";

const API_KEY = process.env.OPENWEATHER_API_KEY;

export const config = {
  api: {
    bodyParser: false,
  },
};

const fetchWeather = async (city: string) => {
  if (!API_KEY) {
    throw new Error("OPENWEATHER_API_KEY not set");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${API_KEY}&units=metric&lang=en`
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`[OpenWeather] ${response.status} ${errText}`);
  }

  return response.json();
};

export const typeDefs = gql`
  scalar UnixTime

  type City {
    name: String!
    country: String!
    sunrise: UnixTime!
    sunset: UnixTime!
    population: Int
  }

  type WeatherBrief {
    main: String!
    description: String!
    icon: String!
  }

  type Temperature {
    current: Float!
    feelsLike: Float!
    min: Float!
    max: Float!
    humidity: Int!
  }

  type Wind {
    speed: Float!
    deg: Int!
    gust: Float
  }

  type Precipitation {
    probability: Float!
    volume: Float
  }

  type ForecastItem {
    dt: UnixTime!
    timeText: String!
    temp: Temperature!
    weather: WeatherBrief!
    clouds: Int!
    wind: Wind!
    precipitation: Precipitation!
  }

  type Forecast {
    city: City!
    list: [ForecastItem!]!
  }

  type Query {
    forecast(city: String!): Forecast!
  }
`;

// time schema
const UnixTime = new GraphQLScalarType({
  name: "UnixTime",
  description: "Unix timestamp in seconds",
  parseValue(value) {
    // from client input
    return typeof value === "number" ? value : null;
  },
  serialize(value) {
    // sent to client
    return typeof value === "number" ? value : null;
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10);
    }
    return null;
  },
});

export const resolvers = {
  UnixTime,
  Query: {
    forecast: async (_: unknown, { city }: { city: string }) => {
      try {
        const raw = await fetchWeather(city);
        return {
          city: {
            name: raw.city.name,
            country: raw.city.country,
            sunrise: raw.city.sunrise,
            sunset: raw.city.sunset,
            population: raw.city.population,
          },
          list: raw.list.map((item) => ({
            dt: item.dt,
            timeText: item.dt_txt,
            temp: {
              current: item.main.temp,
              feelsLike: item.main.feels_like,
              min: item.main.temp_min,
              max: item.main.temp_max,
              humidity: item.main.humidity,
            },
            weather: {
              main: item.weather[0].main,
              description: item.weather[0].description,
              icon: item.weather[0].icon,
            },
            clouds: item.clouds.all,
            wind: {
              speed: item.wind.speed,
              deg: item.wind.deg,
              gust: item.wind.gust,
            },
            precipitation: {
              probability: item.pop,
              volume: item.rain?.["3h"] ?? null,
            },
          })),
        };
      } catch (err) {
        console.error("⚠️ forecast resolver error:", err);
        throw err;
      }
    },
  },
};

// ApolloServer 인스턴스 및 핸들러 캐시
let apolloServer: ApolloServer;
let apolloHandler: ReturnType<ApolloServer["createHandler"]> | null = null;

async function getApolloHandler() {
  if (!apolloHandler) {
    apolloServer = new ApolloServer({ typeDefs, resolvers });
    await apolloServer.start();
    apolloHandler = apolloServer.createHandler({ path: "/api/graphql" });
  }
  return apolloHandler;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).end("Method Not Allowed");
  }

  const h = await getApolloHandler();
  return h(req, res);
}
