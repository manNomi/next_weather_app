import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Image from "next/image";
import forecast from "./style/forecast.module.css";
import banner from "./style/banner.module.css";
import layout from "./style/layout.module.css";
import summary from "./style/summary.module.css";

import {
  getWeatherByCity,
  Forecast,
  ForecastItem,
} from "@/entity/weather/getWeatherByCity";
import downVectorIcon from "@/shared/assets/svg/down-vector.svg";
import upVectorIcon from "@/shared/assets/svg/up-vector.svg";
import earthIcon from "@/shared/assets/svg/earth-graphic.svg";
import WeatherIcon from "../../shared/ui/WeatherIcon";
import { WEATHER_CITIES } from "@/shared/constant/weatherCities";
import {
  formatDate,
  formatTimestamp,
  formatTime,
} from "@/shared/lib/dateFormatter";

interface CityPageProps {
  city: string;
  data: Forecast;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: WEATHER_CITIES.map((c) => ({ params: { city: c } })),
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps<CityPageProps> = async ({
  params,
}) => {
  const city = params?.city as string;
  const data = await getWeatherByCity(city);
  return { props: { city, data } };
};

export default function CityPage({ city, data }: CityPageProps) {
  const [openDate, setOpenDate] = useState<string | null>(null);

  // Group items by date (YYYY-MM-DD)
  const grouped = data.list.reduce<Record<string, ForecastItem[]>>(
    (acc, item) => {
      const date = new Date(item.dt * 1000).toISOString().split("T")[0];
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {}
  );

  const dates = Object.keys(grouped);

  const today = data.list[0];

  return (
    <main className={layout.wrapper}>
      {/* 배너 영역 */}
      <div className={banner.topBanner}>
        <Image
          src={earthIcon}
          alt="Earth graphic icon"
          width={68}
          height={51}
        />
        <h1 className={banner.title}>
          Weather Information for {data.city.name}
        </h1>
      </div>

      {/* 현재 도시의 날씨 섹션 */}
      <section className={summary.summaryCard}>
        <div className={summary.summaryLeft}>
          <WeatherIcon code={today.weather.icon} size={80} />
          <div>
            <div className={summary.timestamp}>{formatTimestamp(today.dt)}</div>
            <div className={summary.location}>
              {data.city.name}, {data.city.country}
              <span className={summary.population}>
                (인구수 : {data.city.population})
              </span>
            </div>
          </div>
        </div>
        <div className={summary.summaryRight}>
          <div className={summary.tempLarge}>
            {today.temp.current.toFixed(2)}°C
          </div>
          <div className={summary.details}>
            Feels like {today.temp.feelsLike.toFixed(2)}°C ·{" "}
            {today.weather.description} 풍속{today.wind.speed.toFixed(2)}m/s ·
            습도 {today.temp.humidity}%
          </div>
        </div>
      </section>

      <section className={forecast.forecastSection}>
        <h2 className={forecast.forecastHeader}>5-day Forecast</h2>
        {dates.map((date) => (
          <div key={date} className={forecast.accordion}>
            <button
              className={forecast.accordionButton}
              onClick={() => setOpenDate(openDate === date ? null : date)}>
              <span className={forecast.accordionTitle}>
                {formatDate(date)}
              </span>
              {openDate === date ? (
                <Image
                  src={upVectorIcon}
                  alt="collapse"
                  width={24}
                  height={24}
                />
              ) : (
                <Image
                  src={downVectorIcon}
                  alt="expand"
                  width={24}
                  height={24}
                />
              )}
            </button>

            {openDate === date && (
              <div className={forecast.accordionContent}>
                {grouped[date].map((item) => {
                  const time = formatTime(item.dt);
                  return (
                    <div key={item.dt} className={forecast.forecastRow}>
                      <div className={forecast.rowIconContainer}>
                        {/* 아이콘: 첫 번째 컬럼 */}
                        <WeatherIcon code={item.weather.icon} />
                        {/* 시간: 두 번째 컬럼 */}
                        <span className={forecast.rowTime}>{time}</span>
                      </div>

                      {/* 설명: 세 번째 컬럼 */}

                      <div className={forecast.rowDescContainer}>
                        {/* 설명 */}
                        <span className={forecast.rowDesc}>
                          {item.weather.description}
                        </span>

                        {/* 온도 */}
                        <span className={forecast.rowTemp}>
                          {item.temp.min.toFixed(2)}°C /{" "}
                          {item.temp.max.toFixed(2)}°C
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ))}
      </section>
    </main>
  );
}
