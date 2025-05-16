import { GetStaticPaths, GetStaticProps } from "next";
import { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
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
    <main className={styles.wrapper}>
      <div className={styles.topBanner}>
        <Image
          src={earthIcon}
          alt="Earth graphic icon"
          width={56}
          height={56}
        />
        <h1 className={styles.title}>
          Weather Information for {data.city.name}
        </h1>
      </div>

      <section className={styles.summaryCard}>
        <div className={styles.summaryLeft}>
          <WeatherIcon code={today.weather.icon} size={48} />
          <div>
            <div className={styles.timestamp}>
              {dateObj.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
              })}{" "}
              {dateObj.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </div>
            <div className={styles.location}>
              {data.city.name}, {data.city.country}
            </div>
          </div>
        </div>
        <div className={styles.summaryRight}>
          <div className={styles.tempLarge}>
            {today.temp.current.toFixed(2)}°C
          </div>
          <div className={styles.details}>
            Feels like {today.temp.feelsLike.toFixed(2)}°C ·{" "}
            {today.weather.description} ·{today.wind.speed.toFixed(1)}m/s ·
            Humidity {today.temp.humidity}%
          </div>
        </div>
      </section>

      <section className={styles.forecastSection}>
        <h2 className={styles.forecastHeader}>5-day Forecast</h2>
        {dates.map((date) => (
          <div key={date} className={styles.accordion}>
            <button
              className={styles.accordionButton}
              onClick={() => setOpenDate(openDate === date ? null : date)}>
              <span className={styles.accordionTitle}>
                {new Date(date).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                })}
              </span>
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
              <div className={styles.accordionContent}>
                {grouped[date].map((item) => {
                  const time = new Date(item.dt * 1000).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: true,
                    }
                  );
                  return (
                    <div key={item.dt} className={styles.forecastRow}>
                      {/* 아이콘: 첫 번째 컬럼 */}
                      <WeatherIcon code={item.weather.icon} size={32} />

                      {/* 시간: 두 번째 컬럼 */}
                      <span className={styles.rowTime}>{time}</span>

                      {/* 설명: 세 번째 컬럼 */}
                      <span className={styles.rowDesc}>
                        {item.weather.description}
                      </span>

                      {/* 온도: 네 번째 컬럼 */}
                      <span className={styles.rowTemp}>
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
