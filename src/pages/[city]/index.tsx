import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Image from "next/image";
import forecast from "./style/forecast.module.css";
import banner from "./style/banner.module.css";
import layout from "./style/layout.module.css";
import summary from "./style/summary.module.css";

import { getForecastByCity } from "@/entity/forecast/getForecastByCity";
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
import CityForecast from "@/widgets/CityForecast";

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
  const data = await getForecastByCity(city);
  return { props: { city, data } };
};

const CityPage = (props: CityPageProps) => {
  const { data } = props;

  // Group items by date (YYYY-MM-DD)
  const grouped = data.list.reduce<Record<string, ForecastEntry[]>>(
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
          <CityForecast date={date} grouped={grouped} />
        ))}
      </section>
    </main>
  );
};
export default CityPage;
