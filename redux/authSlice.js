import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem("token") || null,
  user: localStorage.getItem("user") || null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials(state, action) {
      const { token, user } = action.payload;
      state.token = token;
      state.user = user;
      localStorage.setItem("token", action.payload.token); // Store token in local storage
      localStorage.setItem("user", action.payload.user); // Store token in local storage
    },
    clearToken(state, action) {
      state.token = null;
      state.user = null;
    },
  },
});

export const { setCredentials, clearToken } = authSlice.actions;

export default authSlice.reducer;
export const selectCurrentToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
