import CloudyIcon from "@assets/img/cloudy.png";
import NightIcon from "@assets/img/night.png";
import NotFound from "@assets/img/not-found.png";
import FeelsLikeIcon from "@assets/svg/feels-like.svg?react";
import HumidityIcon from "@assets/svg/humidity.svg?react";
import LocationIcon from "@assets/svg/location.svg?react";
import TemperatureIcon from "@assets/svg/temperature.svg?react";
import WindIcon from "@assets/svg/wind.svg?react";
import { Spacer, TextWithIcon } from "..";
import styles from "./WeatherInfoCard.module.css";
import { CSSProperties } from "react";

type WeatherInfoCardProps = {
  dayAndDate?: {
    day: string;
    date: string;
  };
  locationName: string;
  weatherInfo: {
    temp: number | string | undefined;
    wind: number | string | undefined;
    humidity: number | string | undefined;
    feelsLike: number | string | undefined;
  };
  isEvening?: boolean;
  cityNotFound?: boolean;
};

export default function WeatherInfoCard({
  locationName,
  weatherInfo,
  dayAndDate,
  isEvening,
  cityNotFound,
}: WeatherInfoCardProps): JSX.Element {
  if (cityNotFound) {
    return (
      <div className={styles.container} style={notFoundStyles}>
        <img src={NotFound} height={90} width={90} />
        <Spacer space="lg" />
        <p
          className={styles.dateText}
          style={{ textAlign: "center", fontSize: "1.5rem" }}
        >
          Couldn't find that city!
        </p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.dateLocationHolder}>
        <div>
          <p className={styles.dateText}>{dayAndDate?.day || ""}</p>
          <Spacer space="xs" />
          <p className={styles.date}>{dayAndDate?.date || ""}</p>
        </div>
        <div className={styles.locationNameHolder}>
          <LocationIcon className={styles.locationIcon} />
          <Spacer space="xxs" between />
          <p className={styles.locationText}>{locationName || ""}</p>
        </div>
      </div>
      <Spacer space="xl" />

      <img
        className={styles.mobileDayNightIcon}
        src={isEvening ? NightIcon : CloudyIcon}
      />

      <div className={styles.weatherInfoHolder}>
        <div>
          <div className={styles.tempIconHolder}>
            <TemperatureIcon
              className={styles.tempIcon}
              height={60}
              width={60}
              style={{ marginLeft: "-1em" }}
            />
            <p className={styles.tempValue}>
              {weatherInfo.temp ? `${weatherInfo.temp}°C` : "Loading..."}
            </p>
          </div>
          <Spacer space="xl" />
          <TextWithIcon
            text={`Wind: ${weatherInfo.wind}`}
            icon={<WindIcon height={20} width={20} />}
          />
          <Spacer space="sm" />
          <TextWithIcon
            text={`Humidity: ${weatherInfo.humidity}`}
            icon={<HumidityIcon height={20} width={20} />}
          />
          <Spacer space="sm" />
          <TextWithIcon
            text={`Feels like: ${weatherInfo.feelsLike}`}
            icon={<FeelsLikeIcon height={20} width={20} />}
          />
        </div>
        <img
          className={styles.dayNightIcon}
          src={isEvening ? NightIcon : CloudyIcon}
        />
      </div>
    </div>
  );
}

const notFoundStyles: CSSProperties = {
  flex: 1,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
};
