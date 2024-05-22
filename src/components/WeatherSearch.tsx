import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchText } from "../store/searchReducer";
import { saveWeather } from "../store/weatherReducer";

const API_KEY = "6155f29853fa4b96a0194442241705";

const WeatherSearch = (props: any) => {
  const searchValue = useSelector((state: any) => state.search.value);

  const dispatch = useDispatch();

  const handleCityChange = (event: any) => {
    dispatch(setSearchText(event.target.value));
  };

  const fetchAPI = () => {
    // Make a GET request
    fetch(
      `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchValue}`
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
      });
  };

  useEffect(() => {
    fetchAPI();
  }, [searchValue]);

  return (
    <div className="flex flex-col items-center my-4">
      <input
        className="p-2 border-2 rounded-md border-stone-300 capitalize"
        value={searchValue}
        onChange={handleCityChange}
        type="text"
        placeholder="Type your city"
      />
    </div>
  );
};
export default WeatherSearch;
