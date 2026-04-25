import { configureStore } from "@reduxjs/toolkit";
import filtersReducer from "@/store/slices/filtersSlice";
import uiReducer from "@/store/slices/uiSlice";
import { opportunitiesApi } from "@/store/api/opportunitiesApi";
import { companiesApi } from "@/store/api/companiesApi";
import { topicsApi } from "@/store/api/topicsApi";
import { gapsApi } from "@/store/api/gapsApi";

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    ui: uiReducer,
    [opportunitiesApi.reducerPath]: opportunitiesApi.reducer,
    [companiesApi.reducerPath]: companiesApi.reducer,
    [topicsApi.reducerPath]: topicsApi.reducer,
    [gapsApi.reducerPath]: gapsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      opportunitiesApi.middleware,
      companiesApi.middleware,
      topicsApi.middleware,
      gapsApi.middleware,
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
