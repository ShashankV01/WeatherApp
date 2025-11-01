import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "../features/weatherSlice";
import uiReducer from "../features/uiSlice";

const store = configureStore({
  reducer: {
    weather: weatherReducer,
    ui: uiReducer
  }
});

export default store;
