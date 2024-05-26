import { motion } from "framer-motion";
import { useDispatch } from "react-redux";
import { FaSave, FaTrash } from "react-icons/fa";
import { addCity, removeCity } from "../store/citiesReducer";
import { saveWeather } from "../store/weatherReducer";
import { useEffect, useState } from "react";

const API_KEY = "6155f29853fa4b96a0194442241705";
const WeatherCard = (props: any) => {
  const { weather, isSearchResult } = props;
  const [cityWeather, setCityWeather] = useState<any>(null);
  const dispatch = useDispatch();

  const cardBg =
    cityWeather?.current?.is_day === 1
      ? "bg-gradient-to-r from-cyan-500 to-blue-500"
      : "bg-gradient-to-r from-slate-900 to-slate-700";

  const handleSave = () => {
    dispatch(addCity(cityWeather.location.name));
  };

  const handleRemove = () => {
    dispatch(removeCity(cityWeather.location.name));
  };

  const fetchAPI = (searchValue: string) => {
    // Make a GET request
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${searchValue}`
    )
      .then((response) => {
        if (!response.ok) {
          setCityWeather(null);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setCityWeather(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  useEffect(() => {
    fetchAPI(weather);
  }, []);
  console.log(weather, cityWeather);

  return (
    <div>
      {cityWeather ? (
        <motion.div
          key={cityWeather?.location?.name}
          variants={variants}
          animate={"show"}
          initial="hide"
        >
          <div
            className={`group relative flex justify-between overflow-hidden mb-4 ${cardBg} text-white p-4 lg:px-6 rounded-xl gap-40`}
          >
            <div className="">
              <div className="text-xl font-bold">
                {cityWeather?.location?.name}
              </div>
              <div className="text-sm opacity-75 mb-4 font-medium">
                {cityWeather?.location?.localtime.split(" ")[1]}
              </div>
              <div>
                <img src={weather?.current?.condition?.icon} className="w-10" />
              </div>
            </div>
            <div className="flex flex-col justify-between text-right">
              <div className="text-5xl">{cityWeather?.current?.temp_c}°</div>
              <div className="flex justify-end"></div>
            </div>
            {isSearchResult ? (
              <div className="group-hover:flex hidden bg-slate-800/75 absolute left-0 top-0 right-0 bottom-0 text-white justify-center items-center">
                <FaSave
                  className="text-4xl cursor-pointer"
                  onClick={handleSave}
                />
              </div>
            ) : (
              <div className="group-hover:flex hidden bg-slate-800/75 absolute left-0 top-0 right-0 bottom-0 text-white justify-center items-center">
                <FaTrash
                  className="text-4xl cursor-pointer"
                  onClick={handleRemove}
                />
              </div>
            )}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
};

export const variants = {
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
  hide: {
    scale: 0.5,
    opacity: 0,
    transition: {
      ease: "easeOut",
      duration: 0.5,
    },
  },
};

export default WeatherCard;
