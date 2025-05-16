import React from "react";
import Image from "next/image";
import styles from "./style.module.css";

interface WeatherIconProps {
  code: string;
  size?: number;
  alt?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 60, alt }) => {
  const src =
    code.includes("/") || code.includes(".")
      ? code
      : `https://openweathermap.org/img/wn/${code}@2x.png`;

  const [error, setError] = React.useState(false);

  return error ? (
    <div
      className={styles.fallback}
      style={{ width: size, height: size, fontSize: size * 0.3 }}>
      Weather
      <br />
      icon
    </div>
  ) : (
    <Image
      src={src}
      alt={alt ?? `Weather icon`}
      width={size}
      height={size}
      onError={() => setError(true)}
    />
  );
};

export default WeatherIcon;
