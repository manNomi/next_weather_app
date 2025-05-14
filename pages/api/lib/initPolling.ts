import { fetchWeather } from "./fetchWeather";

const cities = ["Seoul", "Tokyo", "Paris"];
cities.forEach(fetchWeather);
setInterval(() => {
  cities.forEach(fetchWeather);
}, 10 * 60 * 1000);
