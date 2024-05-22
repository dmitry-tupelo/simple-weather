import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./weatherReducer";
import citiesReducer from "./citiesReducer";
import searchReducer from "./searchReducer";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    search: searchReducer,
    cities: citiesReducer,
  },
});
