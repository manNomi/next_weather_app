import { getDateFromTimestamp } from "@/shared/lib/dateFormatter";
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

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY;

export async function getForecastByCity(city: string) {
  // 빌드 타임 감지
  const isBuildTime = typeof window === "undefined";

  try {
    // 빌드 타임에는 OpenWeather API 직접 호출
    if (isBuildTime) {
      const data = await fetchWeather(city);
      // OpenWeather 응답을 내부 GraphQL 스키마에 맞게 변환
      return transformOpenWeatherToSchema(data);
    }
    // 일반적인 상황에서는 기존 fetchStatic 유틸 함수 사용
    else {
      const result = await fetchStatic<CityForecastRequest>(
        GET_FORECAST_BY_CITY,
        {
          city,
        }
      );
      return result.forecast;
    }
  } catch (error) {
    console.error(`해당 도시 데이터를 가져오지 못했습니다: ${city}`, error);
    return null;
  }
}

const fetchWeather = async (city: string) => {
  if (!OPENWEATHER_API_KEY) {
    throw new Error("OPENWEATHER_API_KEY not set");
  }

  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${encodeURIComponent(
      city
    )}&appid=${OPENWEATHER_API_KEY}&units=metric&lang=en`
  );

  if (!response.ok) {
    const errText = await response.text();
    throw new Error(`[OpenWeather] ${response.status} ${errText}`);
  }

  return response.json();
};

// OpenWeather API 응답을 내부 GraphQL 스키마 형식으로 변환하는 함수
const transformOpenWeatherToSchema = (openWeatherData: any) => {
  return {
    city: {
      country: openWeatherData.city.country,
      population: openWeatherData.city.population,
    },
    list: openWeatherData.list.map((item: any) => ({
      dt: item.dt,
      timeText: getDateFromTimestamp(item.dt),
      temp: {
        current: item.main.temp,
        feelsLike: item.main.feels_like,
        min: item.main.temp_min,
        max: item.main.temp_max,
        humidity: item.main.humidity,
      },
      weather: {
        description: item.weather[0]?.description || "",
        icon: item.weather[0]?.icon || "",
      },
      wind: {
        speed: item.wind.speed,
      },
    })),
  };
};
