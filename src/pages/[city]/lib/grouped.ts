import { getDateFromTimestamp } from "@/shared/lib/dateFormatter";

export const convertGrouped = (data: CityForecastResponse) => {
  const grouped = data.list.reduce<Record<string, ForecastEntry[]>>(
    (acc, item) => {
      const date = getDateFromTimestamp(item.dt);
      if (!acc[date]) acc[date] = [];
      acc[date].push(item);
      return acc;
    },
    {}
  );
  return grouped;
};
