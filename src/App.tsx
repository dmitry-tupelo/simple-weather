import "./output.css";
import WeatherCard from "./components/WeatherCard";
import WeatherSearch from "./components/WeatherSearch";
import { useSelector } from "react-redux";
import CitiesList from "./components/CitiesList";

function App() {
  const cities = useSelector((state: any) => state.cities);

  return (
    <div className="App-init max-w-sm mx-auto">
      <h4 className="text-center text-xl w-full mt-4">
        Hello on SimpleWeather
      </h4>
      <WeatherSearch />
      {cities.length > 0 && <CitiesList />}
    </div>
  );
}

export default App;
