import { fetchStatic } from "@/shared/util/apiUtil";
import { gql, DocumentNode } from "@apollo/client";

export const GET_FORECAST_BY_CITY: DocumentNode = gql`
  query Forecast($city: String!) {
    forecast(city: $city) {
      city {
        country
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
          description
          icon
        }
        wind {
          speed
        }
      }
    }
  }
`;

export async function getForecastByCity(props: CityForecastRequest) {
  const { city } = props;
  const result = await fetchStatic<CityForecastRequest>(GET_FORECAST_BY_CITY, {
    city,
  });
  return result.forecast;
}
