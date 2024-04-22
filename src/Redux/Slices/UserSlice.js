import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  values: [],
};

export const UserSlice = createSlice({
  name: "UserSlice",
  initialState,
  reducers: {
    setLogin: (state, action) => {
      localStorage.setItem("token", action.payload);
    },
    setLogout: (state, action) => {
      localStorage.removeItem("token");
    },
    setUsers: (state, action) => {
      state.values = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setLogin, setLogout, setUsers } = UserSlice.actions;

export default UserSlice.reducer;
