import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import banner from "./style/banner.module.css";
import layout from "./style/layout.module.css";
import summary from "./style/summary.module.css";

import { getForecastByCity } from "@/entity/forecast/getForecastByCity";
import earthIcon from "@/shared/assets/svg/earth-graphic.svg";
import WeatherIcon from "../../shared/ui/WeatherIcon";
import { WEATHER_CITIES } from "@/shared/constant/weatherCities";
import { formatTimestamp } from "@/shared/lib/dateFormatter";
import CityForecast from "@/widgets/CityForecast";
import { convertGrouped } from "./lib/grouped";
import React from "react";

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
  return { props: { city, data }, revalidate: 10 * 60 };
};

const CityPage = (props: CityPageProps) => {
  const { data } = props;

  // 날짜별로 그룹화된 데이터를 메모이제이션
  const grouped = React.useMemo(() => convertGrouped(data), [data]);
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

      <section className={layout.forecastSection}>
        <h2 className={layout.forecastHeader}>5-day Forecast</h2>
        {dates.map((date, index) => (
          <CityForecast
            key={`${date} - ${index}`}
            forecastData={grouped[date]}
            date={date}
          />
        ))}
      </section>
    </main>
  );
};
export default CityPage;
