type ForecastCityInfo = {
  country: string;
  population: number;
};

type WeatherTemperatureData = {
  current: number;
  feelsLike: number;
  min: number;
  max: number;
  humidity: number;
};

type WeatherCondition = {
  main: string;
  description: string;
  icon: string;
};

type WindInfo = {
  speed: number;
};

type ForecastEntry = {
  dt: number;
  timeText: string;
  temp: WeatherTemperatureData;
  weather: WeatherCondition;
  wind: WindInfo;
};

type CityForecastResponse = {
  city: ForecastCityInfo;
  list: ForecastEntry[];
};
