import React from "react";
import Image from "next/image";
// css
import Title from "@/widgets/main/style/title.module.css";
import Button from "@/widgets/main/style/button.module.css";
import Layout from "@/widgets/main/style/layout.module.css";
// assets
import earthGraphic from "@/shared/assets/svg/earth-graphic.svg";
// constant
import { WEATHER_CITIES } from "@/shared/constant/weatherCities";
import { useRouter } from "next/router";

const Main = () => {
  const router = useRouter();
  return (
    <div className={Layout.container}>
      <h1 className={Title.title}>
        Welcome to <div className={Title.highlight}>Weather App!</div>
      </h1>
      <p className={Title.subtitle}>
        Choose a city from the list below to check the weather.
      </p>

      <div className={Button.buttonRow}>
        {WEATHER_CITIES.map((city) => (
          <button
            key={city}
            className={Button.button}
            onClick={() => {
              router.push(`/${city}`);
            }}>
            {city}
          </button>
        ))}
      </div>

      <div className={Layout.earthWrapper}>
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
