import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import weatherApi from "../services/weatherApi";

/**
 * fetchWeatherForCity - gets current+hourly+daily onecall data.
 * The weatherApi implements caching so repeated calls within TTL will use cache.
 */
export const fetchWeatherForCity = createAsyncThunk(
  "weather/fetchWeatherForCity",
  async ({ lat, lon, cityKey }, thunkAPI) => {
    const data = await weatherApi.getWeather({ lat, lon });
    return { cityKey, data };
  }
);

const initialState = {
  cities: {}, // cityKey -> payload { meta, current, hourly, daily, lastUpdated }
  favourites: [], // array of cityKeys (persisted)
  unit: "metric", // 'metric' or 'imperial'
  status: "idle",
  error: null
};

const slice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    addFavourite(state, action) {
      if (!state.favourites.includes(action.payload)) {
        state.favourites.push(action.payload);
        localStorage.setItem("wa:favs", JSON.stringify(state.favourites));
      }
    },
    removeFavourite(state, action) {
      state.favourites = state.favourites.filter((c) => c !== action.payload);
      localStorage.setItem("wa:favs", JSON.stringify(state.favourites));
    },
    setUnit(state, action) {
      state.unit = action.payload;
      localStorage.setItem("wa:unit", state.unit);
    },
    loadPersisted(state) {
      const f = localStorage.getItem("wa:favs");
      const u = localStorage.getItem("wa:unit");
      if (f) state.favourites = JSON.parse(f);
      if (u) state.unit = u;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeatherForCity.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchWeatherForCity.fulfilled, (state, action) => {
        const { cityKey, data } = action.payload;
        state.cities[cityKey] = { ...data, lastUpdated: Date.now() };
        state.status = "succeeded";
      })
      .addCase(fetchWeatherForCity.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { addFavourite, removeFavourite, setUnit, loadPersisted } = slice.actions;
export default slice.reducer;
