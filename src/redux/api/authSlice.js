"use client";
import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    accessToken: "",
  },
  reducers: {
    setCredentials: (state, action) => {
      return action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    logOut: (state, action) => {
      state.accessToken = "";
      window.sessionStorage.clear();
      window.location.href = "https://auth.aunexa.net/logout";
    },
  },
});

export const { setCredentials, setAccessToken, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentRole = (state) => state.auth.role;
export const selectCurrentAccessToken = (state) => state.auth.accessToken;
