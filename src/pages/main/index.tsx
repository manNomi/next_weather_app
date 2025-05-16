import React from "react";
import Image from "next/image";
// css
import Title from "@/widgets/main/style/title.module.css";
import Layout from "@/widgets/main/style/layout.module.css";
// assets
import earthGraphic from "@/shared/assets/svg/earth-graphic.svg";
// constant
import { WEATHER_CITIES } from "@/shared/constant/weatherCities";
// ui
import SelectLink from "@/widgets/main/ui/SelectLink";
import SeoMetaTags from "@/shared/lib/meta/seoMetaTag";

const Main = () => {
  return (
    <>
      <SeoMetaTags />
      <main className={Layout.container}>
        <h1 className={Title.title}>
          Welcome to <div className={Title.highlight}>Weather App!</div>
        </h1>
        <p className={Title.subtitle}>
          Choose a city from the list below to check the weather.
        </p>

        <nav className={Layout.buttonContainer}>
          {WEATHER_CITIES.map((city, index) => (
            <SelectLink
              key={`${city}-link-${index}`}
              innerText={city}
              href={city}
            />
          ))}
        </nav>

        <section className={Layout.earthWrapper}>
          <Image
            src={earthGraphic}
            alt="Earth graphic"
            width={400}
            height={400}
          />
        </section>
      </main>
    </>
  );
};

export default Main;
