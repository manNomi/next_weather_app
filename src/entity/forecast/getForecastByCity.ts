import { fetchStatic } from "@/shared/util/apiUtil";
import { gql, DocumentNode } from "@apollo/client";

export const GET_FORECAST_BY_CITY: DocumentNode = gql`
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

export async function getForecastByCity(props: CityForecastRequest) {
  const { city } = props;
  const result = await fetchStatic<
    { forecast: CityForecastResponse },
    { city: string }
  >(GET_FORECAST_BY_CITY, { city });
  return result.forecast;
}
