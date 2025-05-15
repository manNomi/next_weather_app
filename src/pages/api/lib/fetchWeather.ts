const API_KEY = process.env.OPENWEATHER_API_KEY;

export const weatherCache: Record<string, any> = {};

export const fetchWeather = async (city: string) => {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric&lang=kr`
  );
  if (response.ok) {
    const data = await response.json();
    weatherCache[city] = data;
  } else {
    console.error(`${city} 날씨 정보 갱신 실패`);
  }
};
