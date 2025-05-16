import React from "react";
import Image from "next/image";
import styles from "./style.module.css";
import earthGraphic from "../../shared/assets/svg/earth-graphic.svg";
import { WEATHER_CITIES } from "src/shared/constant/weatherCities";

export const Main = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <span className={styles.highlight}>Weather App!</span>
      </h1>
      <p className={styles.subtitle}>
        Choose a city from the list below to check the weather.
      </p>

      <div className={styles.buttonRow}>
        {WEATHER_CITIES.map((city) => (
          <button
            key={city}
            className={styles.button}
            onClick={() => {
              window.location.href = `/city/${city}`;
            }}>
            {city}
          </button>
        ))}
      </div>

      <div className={styles.earthWrapper}>
        <Image
          src={earthGraphic}
          alt="Earth graphic"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default Main;
