import { createSlice } from "@reduxjs/toolkit";

const storedUser = localStorage.getItem("user");

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user: storedUser ? JSON.parse(storedUser) : null
  },

  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },

    logout: (state) => {
      state.user = null;
      localStorage.removeItem("user");
    }
  }
});

export const { setUser, logout } = authSlice.actions;

export default authSlice.reducer;