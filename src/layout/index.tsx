import "@app/App.css";
import {
  Header,
  RecentSearchList,
  SearchInput,
  Spacer,
  WeatherInfoCard,
} from "@app/components";
import { API_KEY, BASE_URL, DEFAULT_CITY } from "@app/constants";
import { AppState, RecentSearch, WeatherResponse } from "@app/types";
import {
  formatDateByMonth,
  getWeekDayName,
  isEveningTime,
  readFromLocalStorage,
  writeToLocalStorage,
} from "@app/utils/functions";
import { useEffect, useState } from "react";
import { v4 as uniqueId } from "uuid";

const generateRequestEndpoint = (query: string): string => {
  const queryParams = new URLSearchParams({
    q: query,
    appid: API_KEY,
    units: "metric",
  });
  return `${BASE_URL}?${queryParams.toString()}`;
};

const initialState: AppState = {
  recentSearchesList: [],
  searchQuery: "",
  weatherData: undefined,
  isFetchingWeather: false,
  cityNotFound: false,
};

export default function Layout() {
  const [appState, setAppState] = useState(initialState);

  const getWeatherData = async (cityName: string): Promise<boolean> => {
    try {
      setAppState((prevState) => ({
        ...prevState,
        isFetchingWeather: true,
        cityNotFound: false,
      }));

      const REQUEST_ENDPOINT = generateRequestEndpoint(cityName);
      const res = await fetch(REQUEST_ENDPOINT);

      if (!res.ok) {
        // If city not found
        if (res.status === 404) {
          setAppState((prevState) => ({ ...prevState, cityNotFound: true }));
          // If API request failed (Missing API Key, Unauthorized request, etc).
        } else if (res.status === 401) {
          handleAPIFailure();
        }
        return false;
      }

      const weatherData = (await res.json()) as WeatherResponse;

      if (weatherData && weatherData.main && weatherData.main.temp) {
        setAppState((prevState) => ({
          ...prevState,
          isFetchingWeather: false,
          weatherData,
        }));
        writeToLocalStorage("recentSearchedCity", cityName);

        /**
         * Stores the last successful weather response in the local storage.
         * This ensures that if an API request fails, the most recent
         * successful response can be retrieved and shown to the user.
         */
        writeToLocalStorage("lastSuccessfulWeatherResponse", weatherData);

        return true;
      }
    } catch (error) {
      console.error("Failed to get weather data:", error);
    } finally {
      setAppState((prevState) => ({ ...prevState, isFetchingWeather: false }));
    }
    return false;
  };

  const removeRecentSearchItem = (id: string) => {
    const updatedRecentSearches =
      appState.recentSearchesList?.filter((item) => item.id !== id) || [];
    setAppState((prevState) => ({
      ...prevState,
      recentSearchesList: updatedRecentSearches,
    }));
    writeToLocalStorage("recentSearchesList", updatedRecentSearches);
  };

  const handleRecentSearchSelection = (selectedQuery: string) => {
    if (selectedQuery !== appState.searchQuery) {
      setAppState((prevState) => ({
        ...prevState,
        searchQuery: selectedQuery,
      }));
      getWeatherData(selectedQuery);
    }
  };

  const addItemToLocalStorage = (cityName: string) => {
    if (!appState.recentSearchesList?.some((item) => item?.text === cityName)) {
      const updatedRecentSearches = [
        {
          id: uniqueId(),
          text: cityName,
        },
        ...appState.recentSearchesList,
      ];
      setAppState((prevState) => ({
        ...prevState,
        recentSearchesList: updatedRecentSearches,
      }));
      writeToLocalStorage("recentSearchesList", updatedRecentSearches);
    }
  };

  const handleAPIFailure = () => {
    setAppState((prevState) => ({
      ...prevState,
      weatherData: JSON.parse(
        readFromLocalStorage("lastSuccessfulWeatherResponse") as string
      ),
    }));
  };

  const handleSearchWeather = async () => {
    if (!appState.searchQuery) {
      alert("City name cannot be empty!");
    } else {
      const res = await getWeatherData(appState.searchQuery);
      if (res) {
        addItemToLocalStorage(appState.searchQuery);
      }
    }
  };

  const initializeApp = () => {
    getWeatherData(readFromLocalStorage("recentSearchedCity") || DEFAULT_CITY);

    const localRecentSearchList: RecentSearch[] =
      JSON.parse(readFromLocalStorage("recentSearchesList") as string) || [];

    setAppState((prevState) => ({
      ...prevState,
      recentSearchesList: localRecentSearchList,
    }));
  };

  useEffect(initializeApp, []);

  return (
    <div className="app-wrapper">
      <Header title="Weatherly" />
      <Spacer space="xl" />
      <div className="search-input-holder">
        <SearchInput
          onChange={(text) => {
            setAppState({
              ...appState,
              searchQuery: text,
            });
          }}
          placeholder="Search a city..."
          value={appState.searchQuery}
        />
        <Spacer space="sm" between />

        <button
          className="search-button"
          onClick={handleSearchWeather}
          disabled={appState.isFetchingWeather}
        >
          {appState.isFetchingWeather ? "Loading..." : "Search"}
        </button>
      </div>

      <Spacer space="xl" />
      <div className="weather-cards-holder">
        <WeatherInfoCard
          cityNotFound={appState.cityNotFound}
          isEvening={isEveningTime()}
          weatherInfo={{
            feelsLike: appState.weatherData?.main?.feels_like || "",
            humidity: appState.weatherData?.main?.humidity || "",
            temp: appState.weatherData?.main?.temp || "",
            wind: appState.weatherData?.wind?.speed || "",
          }}
          locationName={appState.weatherData?.name || ""}
          dayAndDate={{
            date: formatDateByMonth(Date.now()),
            day: getWeekDayName(Date.now()),
          }}
        />
        <Spacer between space="xl" />
        <div className="recent-searches-holder">
          <RecentSearchList
            onSelect={handleRecentSearchSelection}
            onRemove={removeRecentSearchItem}
            searchList={appState.recentSearchesList}
          />
        </div>
      </div>
    </div>
  );
}
