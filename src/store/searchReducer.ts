import { createSlice } from "@reduxjs/toolkit";

const searchSlice = createSlice({
  name: "search",
  initialState: { value: "" },
  reducers: {
    setSearchText(state, action) {
      state.value = action.payload;
    },
  },
});

export const { setSearchText } = searchSlice.actions;
export default searchSlice.reducer;
