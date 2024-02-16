import { DateFormatOptions } from "@app/types";

const readFromLocalStorage = <T>(key: string): T | undefined => {
  try {
    const storedValue = localStorage.getItem(key);

    return storedValue as T;
  } catch (error) {
    console.error("Failed to get data from localStorage!", error);
  }
};

const writeToLocalStorage = <T>(key: string, value: T): void => {
  if (typeof value === "object") {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, String(value));
  }
};

function getWeekDayName(
  dateString: string | number,
  options?: DateFormatOptions
): string {
  const defaultOptions: DateFormatOptions = {
    weekday: "long",
  };

  const mergedOptions: DateFormatOptions = { ...defaultOptions, ...options };

  const formattedDate = new Date(dateString).toLocaleDateString(
    "en-US",
    mergedOptions
  );
  return formattedDate;
}

const formatDateByMonth = (date: string | number): string => {
  return new Date(date).toLocaleDateString("en-US", {
    month: "short",
    day: "2-digit",
    year: "numeric",
  });
};

const isEveningTime = (): boolean => {
  const currentHour = new Date().getHours();
  return currentHour >= 20;
};

export {
  readFromLocalStorage,
  writeToLocalStorage,
  getWeekDayName,
  formatDateByMonth,
  isEveningTime,
};
