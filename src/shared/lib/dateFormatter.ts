export const formatDate = (dateStr: string): string => {
  return new Date(dateStr).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
};

export const formatTime = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  });
};

export const formatTimestamp = (timestamp: number): string => {
  const dateObj = new Date(timestamp * 1000);
  return (
    dateObj.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }) +
    " " +
    dateObj.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  );
};

export const getDateFromTimestamp = (timestamp: number): string => {
  return new Date(timestamp * 1000).toLocaleDateString("en-CA", {
    timeZone: "Asia/Seoul",
  });
};
