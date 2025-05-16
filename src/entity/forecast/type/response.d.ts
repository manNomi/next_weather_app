type ForecastCityInfo = {
  name: string;
  country: string;
  sunrise: number;
  sunset: number;
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
  deg: number;
  gust: number;
};

type PrecipitationInfo = {
  probability: number;
  volume: number | null;
};

type ForecastEntry = {
  dt: number;
  timeText: string;
  temp: WeatherTemperatureData;
  weather: WeatherCondition;
  clouds: number;
  wind: WindInfo;
  precipitation: PrecipitationInfo;
};

type CityForecastResponse = {
  city: ForecastCityInfo;
  list: ForecastEntry[];
};
