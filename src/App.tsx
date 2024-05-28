import "./output.css";
import { initializeApp } from "firebase/app";
import WeatherCard from "./components/WeatherCard";
import WeatherSearch from "./components/WeatherSearch";
import { useSelector } from "react-redux";
import CitiesList from "./components/CitiesList";
import FirebaseAuth from "./components/FirebaseAuth";

function App() {
  const cities = useSelector((state: any) => state.cities);

  return (
    <div className="App-init max-w-sm mx-auto my-4">
      <FirebaseAuth>
        <h4 className="text-center text-xl w-full mt-4">
          Hello on SimpleWeather ☀️
        </h4>
        <div className="text-center">Enter your city 🏙️...</div>
        <WeatherSearch />
        {cities.length > 0 && <CitiesList />}
      </FirebaseAuth>
    </div>
  );
}

export default App;
