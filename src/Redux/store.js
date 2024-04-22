import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "./Slices/loaderSlice";
import UserSlice from "./Slices/UserSlice";
import SliceGroup from "./Slices/SliceGroup";

export const store = configureStore({
  reducer: {
    loader: loaderSlice,
    user: UserSlice,
    groups: SliceGroup,
  },
});
