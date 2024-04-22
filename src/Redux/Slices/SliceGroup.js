import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  groupvalues: [],
};

export const SliceGroup = createSlice({
  name: "SliceGroup",
  initialState,
  reducers: {
    setGroups: (state, action) => {
      console.log(action.payload, "actions");
      state.groupvalues = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setGroups } = SliceGroup.actions;

export default SliceGroup.reducer;
