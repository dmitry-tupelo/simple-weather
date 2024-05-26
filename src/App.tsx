import "./output.css";
import WeatherCard from "./components/WeatherCard";
import WeatherSearch from "./components/WeatherSearch";
import { useSelector } from "react-redux";
import CitiesList from "./components/CitiesList";

function App() {
  const cities = useSelector((state: any) => state.cities);

  return (
    <div className="max-w-sm mx-auto">
      <WeatherSearch />
      {cities.length > 0 && <CitiesList />}
    </div>
  );
}

export default App;
