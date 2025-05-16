import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Image from "next/image";
import style from "./style.module.css";
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
  const dateObj = new Date(today.dt * 1000);

  return (
    <main className={style.wrapper}>
      <div className={style.topBanner}>
        <Image
          src={earthIcon}
          alt="Earth graphic icon"
          width={68}
          height={51}
        />
        <h1 className={style.title}>
          Weather Information for {data.city.name}
        </h1>
      </div>

      <section className={style.summaryCard}>
        <div className={style.summaryLeft}>
          <WeatherIcon code={today.weather.icon} size={80} />
          <div>
            <div className={style.timestamp}>{formatTimestamp(today.dt)}</div>
            <div className={style.location}>
              {data.city.name}, {data.city.country}
            </div>
          </div>
        </div>
        <div className={style.summaryRight}>
          <div className={style.tempLarge}>
            {today.temp.current.toFixed(2)}°C
          </div>
          <div className={style.details}>
            Feels like {today.temp.feelsLike.toFixed(2)}°C ·{" "}
            {today.weather.description} ·{today.wind.speed.toFixed(1)}m/s ·
            Humidity {today.temp.humidity}%
          </div>
        </div>
      </section>

      <section className={style.forecastSection}>
        <h2 className={style.forecastHeader}>5-day Forecast</h2>
        {dates.map((date) => (
          <div key={date} className={style.accordion}>
            <button
              className={style.accordionButton}
              onClick={() => setOpenDate(openDate === date ? null : date)}>
              <span className={style.accordionTitle}>{formatDate(date)}</span>
              {openDate === date ? (
                <Image
                  src={upVectorIcon}
                  alt="collapse"
                  width={20}
                  height={20}
                />
              ) : (
                <Image
                  src={downVectorIcon}
                  alt="expand"
                  width={20}
                  height={20}
                />
              )}
            </button>
            {openDate === date && (
              <div className={style.accordionContent}>
                {grouped[date].map((item) => {
                  const time = formatTime(item.dt);
                  return (
                    <div key={item.dt} className={style.forecastRow}>
                      {/* 아이콘: 첫 번째 컬럼 */}
                      <WeatherIcon code={item.weather.icon} size={32} />

                      {/* 시간: 두 번째 컬럼 */}
                      <span className={style.rowTime}>{time}</span>

                      {/* 설명: 세 번째 컬럼 */}
                      <span className={style.rowDesc}>
                        {item.weather.description}
                      </span>

                      {/* 온도: 네 번째 컬럼 */}
                      <span className={style.rowTemp}>
                        {item.temp.min.toFixed(2)}°C /{" "}
                        {item.temp.max.toFixed(2)}°C
                      </span>
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
