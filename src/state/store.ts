import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import reducers from "./reducers";
//import { persistReducer } from "redux-persist";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
  } from 'redux-persist'

const persistConfig = {
    key: "root",
    version: 1,
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
}); 