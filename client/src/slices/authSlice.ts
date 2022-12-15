import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface Token {
  accessToken: string;
}

const initialState: Token = {
  accessToken: localStorage.getItem("accessToken") || "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    login: (state, action: PayloadAction<Token>) => {
      localStorage.setItem("accessToken", action.payload.accessToken);
      state.accessToken = action.payload.accessToken;

      return state;
    },
    logout: (state) => {
      localStorage.removeItem("accessToken");
      state.accessToken = "";
      window.location.href = "/";
    },
  },
});

export const { login, logout } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
