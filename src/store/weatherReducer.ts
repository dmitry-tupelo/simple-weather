import { createSlice } from "@reduxjs/toolkit";

const weatherSlice = createSlice({
  name: "weather",
  initialState: { forecast: null },
  reducers: {
    saveWeather(state, action) {
      state.forecast = action.payload;
    },
  },
});

export const { saveWeather } = weatherSlice.actions;

export default weatherSlice.reducer;
