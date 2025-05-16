import React from "react";
import Image from "next/image";
import header from "@/widgets/main/style/header.module.css";
import button from "@/widgets/main/style/button.module.css";
import layout from "@/widgets/main/style/layout.module.css";
import earthGraphic from "@/shared/assets/svg/earth-graphic.svg";
import { WEATHER_CITIES } from "@/shared/constant/weatherCities";

const Main = () => {
  return (
    <div className={layout.container}>
      <h1 className={header.title}>
        Welcome to <div className={header.highlight}>Weather App!</div>
      </h1>
      <p className={header.subtitle}>
        Choose a city from the list below to check the weather.
      </p>

      <div className={button.buttonRow}>
        {WEATHER_CITIES.map((city) => (
          <button
            key={city}
            className={button.button}
            onClick={() => {
              window.location.href = `/${city}`;
            }}>
            {city}
          </button>
        ))}
      </div>

      <div className={layout.earthWrapper}>
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
