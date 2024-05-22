import { useSelector } from "react-redux";
import WeatherCard from "./WeatherCard";

const CitiesList = () => {
  const cities = useSelector((state: any) => state.cities);

  const renderCities = () => {
    return cities.map((item: any) => (
      <WeatherCard key={item?.location?.name} weather={item} />
    ));
  };
  return <div>{cities.length > 0 && renderCities()}</div>;
};

export default CitiesList;
