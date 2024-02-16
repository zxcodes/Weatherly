import "./App.css";
import { NoAPIKeyIndicatorText } from "./components";
import Layout from "./layout";

const API_KEY_NOT_FOUND = !import.meta.env.VITE_OPEN_WEATHER_API_KEY || false;

function App() {
  if (API_KEY_NOT_FOUND) {
    return <NoAPIKeyIndicatorText />;
  }

  return <Layout />;
}

export default App;
