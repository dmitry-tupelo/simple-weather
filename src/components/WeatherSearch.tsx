import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../store/searchReducer";
import { saveWeather } from "../store/weatherReducer";
import WeatherCard from "./WeatherCard";

const API_KEY = "6155f29853fa4b96a0194442241705";

const WeatherSearch = (props: any) => {
  const searchValue = useSelector((state: any) => state.search.value);
  const weather = useSelector((state: any) => state.weather.forecast);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const handleCityChange = (event: any) => {
    dispatch(setSearchText(event.target.value));
  };

  const fetchAPI = () => {
    setLoading(true);
    // Make a GET request
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchValue}`
    )
      .then((response) => {
        if (!response.ok) {
          dispatch(saveWeather(null));
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        dispatch(saveWeather(data));
      })
      .catch((error) => {
        console.error("Error:", error);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (searchValue.length > 3) {
      fetchAPI();
    }
  }, [searchValue]);

  return (
    <div className="flex flex-col items-center">
      <input
        className="p-2 border-2 rounded-md border-stone-300 capitalize my-4 border-sky-300"
        value={searchValue}
        onChange={handleCityChange}
        type="text"
        placeholder="Type your city"
      />
      {!loading ? (
        <div className="w-full">
          {weather ? (
            <div className="w-full">
              <WeatherCard
                weather={weather?.location?.name}
                isSearchResult={true}
              />
            </div>
          ) : null}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
};
export default WeatherSearch;
