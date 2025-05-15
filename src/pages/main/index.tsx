import React, { useState } from "react";
import Image from "next/image";
import styles from "./style.module.css";
import earthGraphic from "../../shared/assets/svg/earth-graphic.svg";

const cities = ["Seoul", "Tokyo", "Paris", "London"];

export const Main = () => {
  const [selectedCity, setSelectedCity] = useState<string>("");

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <span className={styles.highlight}>Weather App!</span>
      </h1>
      <p className={styles.subtitle}>
        Choose a city from the list below to check the weather.
      </p>

      <div className={styles.buttonRow}>
        {cities.map((city) => (
          <button
            key={city}
            className={`${styles.button} ${
              selectedCity === city ? styles.selected : ""
            }`}
            onClick={() => setSelectedCity(city)}>
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
