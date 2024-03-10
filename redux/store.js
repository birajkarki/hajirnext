// store.js
import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import rootReducer from "./rootReducer";
import { api } from "@/services/api";
// import { authenticationApi } from "@/services/authenticationEndpoints";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    auth: authReducer,
    root: rootReducer,
  },
  middleware: (getDefaultMiddleware) =>
    // getDefaultMiddleware().concat(api.middleware, authenticationApi.middleware),
    getDefaultMiddleware().concat(api.middleware),
  devTools: true,
});

setupListeners(store.dispatch);

export default store;
