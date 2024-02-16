import { Spacer } from ".";
import "@app/App.css";

const NoAPIKeyIndicatorText = () => {
  return (
    <div className="app-wrapper no-api-key-view">
      <h1>Cannot find OpenWeather API Key!</h1>
      <Spacer space="lg" />
      <h3>
        Create a .env file in the project root and set the environment variable:
        VITE_OPEN_WEATHER_API_KEY = "YOUR_KEY".
      </h3>
    </div>
  );
};

export default NoAPIKeyIndicatorText;
