import React from "react";
import Image from "next/image";

interface WeatherIconProps {
  code: string;
  size?: number;
  alt?: string;
}

const WeatherIcon: React.FC<WeatherIconProps> = ({ code, size = 48, alt }) => {
  const src =
    code.includes("/") || code.includes(".")
      ? code
      : `https://openweathermap.org/img/wn/${code}@2x.png`;

  return (
    <Image src={src} alt={alt ?? `Weather icon`} width={size} height={size} />
  );
};

export default WeatherIcon;
