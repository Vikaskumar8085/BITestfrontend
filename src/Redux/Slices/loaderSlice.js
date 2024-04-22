import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoader: false,
};

export const LoaderSlice = createSlice({
  name: "LoaderSlice",
  initialState,
  reducers: {
    setLoader: (state, action) => {
      state.isLoader = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLoader } = LoaderSlice.actions;

export default LoaderSlice.reducer;
