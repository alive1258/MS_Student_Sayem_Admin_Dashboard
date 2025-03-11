import { configureStore } from "@reduxjs/toolkit";
import { persistStore } from "redux-persist";
import { baseApi } from "./api/baseApi";
import { reducer } from "./rootReducer";

// Check if window is defined (client-side)
const isClient = typeof window !== "undefined";

// Configure store
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST"],
        ignoredActionPaths: ["register"],
        ignoredPaths: ["register"],
        serializableCheck: false,
      },
    }).concat(baseApi.middleware),
});

// Create a persistor only on the client-side to avoid SSR issues
export const persistor = isClient ? persistStore(store) : null;
