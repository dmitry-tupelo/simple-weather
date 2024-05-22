import "./output.css";
import WeatherCard from "./components/WeatherCard";
import WeatherSearch from "./components/WeatherSearch";
import { useSelector } from "react-redux";
import CitiesList from "./components/CitiesList";

function App() {
  const weather = useSelector((state: any) => state.weather.forecast);
  const cities = useSelector((state: any) => state.cities);

  return (
    <div className="max-w-sm mx-auto">
      <WeatherSearch />
      {weather ? (
        <div className="w-full">
          <WeatherCard weather={weather} isSearchResult />
        </div>
      ) : null}
      {cities.length > 0 && <CitiesList />}
    </div>
  );
}

export default App;
