import { createSlice } from "@reduxjs/toolkit";

const citiesSlice = createSlice({
  name: "cities",
  initialState: [] as any,
  reducers: {
    addCity(state, action) {
      state.push(action.payload);
    },
    removeCity(state, action) {
      return state.filter((item: any) => item !== action.payload);
    },
  },
});

export const { addCity, removeCity } = citiesSlice.actions;
export default citiesSlice.reducer;
