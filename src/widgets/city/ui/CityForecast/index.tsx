import React, { useState } from "react";
import Image from "next/image";
import useToggleState from "@/shared/model/useToggleState";
import { formatDate, formatTime } from "@/shared/lib/dateFormatter";
import WeatherIcon from "@/shared/ui/WeatherIcon";
import upVectorIcon from "@/shared/assets/svg/up-vector.svg";
import downVectorIcon from "@/shared/assets/svg/down-vector.svg";
import forecast from "./style/forecast.module.css";

const CityForecast = (props: CityForecastProps) => {
  const { date, forecastData } = props;

  // state
  const [isExpanded, toggleExpanded] = useToggleState();

  return (
    <div className={forecast.accordion}>
      <button className={forecast.accordionButton} onClick={toggleExpanded}>
        <span className={forecast.accordionTitle}>{formatDate(date)}</span>
        {isExpanded ? (
          <Image src={upVectorIcon} alt="collapse" width={24} height={24} />
        ) : (
          <Image src={downVectorIcon} alt="expand" width={24} height={24} />
        )}
      </button>

      {isExpanded && (
        <div className={forecast.accordionContent}>
          {forecastData.map((item, index) => (
            <div key={`${item.dt} - ${index}`} className={forecast.forecastRow}>
              <div className={forecast.rowIconContainer}>
                {/* 아이콘: 첫 번째 컬럼 */}
                <WeatherIcon code={item.weather.icon} />
                {/* 시간: 두 번째 컬럼 */}
                <span className={forecast.rowTime}>{formatTime(item.dt)}</span>
              </div>

              {/* 설명: 세 번째 컬럼 */}

              <div className={forecast.rowDescContainer}>
                {/* 설명 */}
                <span className={forecast.rowDesc}>
                  {item.weather.description}
                </span>

                {/* 온도 */}
                <span className={forecast.rowTemp}>
                  {item.temp.min.toFixed(2)}°C / {item.temp.max.toFixed(2)}°C
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default CityForecast;
