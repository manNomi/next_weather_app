import { gql } from "@apollo/client";
import { client } from "../../shared/lib/apolloClient";

export interface City {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
  population: number;
}

export interface Temperature {
  current: number;
  feelsLike: number;
  min: number;
  max: number;
  humidity: number;
}

export interface WeatherBrief {
  main: string;
  description: string;
  icon: string;
}

export interface Wind {
  speed: number;
  deg: number;
  gust: number;
}

export interface Precipitation {
  probability: number;
  volume: number | null;
}

export interface ForecastItem {
  dt: number;
  timeText: string;
  temp: Temperature;
  weather: WeatherBrief;
  clouds: number;
  wind: Wind;
  precipitation: Precipitation;
}

export interface Forecast {
  city: City;
  list: ForecastItem[];
}

const GET_WEATHER_BY_CITY = gql`
  query Forecast($city: String!) {
    forecast(city: $city) {
      city {
        name
        country
        sunrise
        sunset
        population
      }
      list {
        dt
        timeText
        temp {
          current
          feelsLike
          min
          max
          humidity
        }
        weather {
          main
          description
          icon
        }
        clouds
        wind {
          speed
          deg
          gust
        }
        precipitation {
          probability
          volume
        }
      }
    }
  }
`;

export async function getWeatherByCity(city: string) {
  try {
    const { data } = await client.query<{ forecast: Forecast }>({
      query: GET_WEATHER_BY_CITY,
      variables: { city },
      fetchPolicy: "network-only",
    });
    return data.forecast;
  } catch (error) {
    console.error(
      "getWeatherByCity GraphQL query failed",
      JSON.stringify(error, null, 2)
    );
    throw error;
  }
}
