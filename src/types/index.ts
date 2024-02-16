type DateFormatOptions = {
  weekday?: "long" | "short" | "narrow";
  day?: "numeric" | "2-digit";
  month?: "numeric" | "2-digit" | "long" | "short" | "narrow";
  year?: "numeric" | "2-digit";
};

type WeatherResponse = {
  coord: Coord;
  weather: Weather[];
  base: string;
  main: Main;
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
};

type Coord = {
  lon: number;
  lat: number;
};

type Weather = {
  id: number;
  main: string;
  description: string;
  icon: string;
};

type Main = {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
};

type Wind = {
  speed: number;
  deg: number;
};

type Clouds = {
  all: number;
};

type Sys = {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
};

type RecentSearch = { id: string; text: string };

type AppState = {
  recentSearchesList: RecentSearch[];
  searchQuery: string;
  weatherData: WeatherResponse | undefined;
  isFetchingWeather: boolean;
  cityNotFound: boolean;
};

export type { WeatherResponse, DateFormatOptions, RecentSearch, AppState };
