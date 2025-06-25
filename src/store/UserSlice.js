import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
  userRole: null,
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action) => {
      state.userInfo = action.payload;
      state.isLoggedIn = true;
    },
    setUserRole: (state, action) => {
      state.userRole = action.payload;
    },
    logout: (state) => {
      state.userInfo = null;
      state.userRole = null;
      state.isLoggedIn = false;
    },
  },
});

export const { setUserName, setUserRole, logout } = userSlice.actions;
export default userSlice.reducer;
