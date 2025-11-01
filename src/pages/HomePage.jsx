import React, { useEffect } from "react";
import Dashboard from "../components/Dashboard";
import SearchBar from "../components/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import { fetchWeatherForCity } from "../features/weatherSlice";
import useInterval from "../hooks/useInterval";

/**
 * HomePage:
 * - Loads default cities and favourites
 * - Polls every 60s to refresh data (useInterval)
 */

const DEFAULT_CITIES = [
  { key: "newyork", name: "New York,US", lat: 40.7128, lon: -74.006 },
  { key: "london", name: "London,GB", lat: 51.5074, lon: -0.1278 },
  { key: "mumbai", name: "Mumbai,IN", lat: 19.076, lon: 72.8777 }
];

export default function HomePage() {
  const dispatch = useDispatch();
  const favourites = useSelector((s) => s.weather.favourites);

  const loadList = () => {
    const merged = [...DEFAULT_CITIES];
    // favourites may be stored as keys like "lat:lon" - we just request from cached cities if present
    favourites.forEach((f) => {
      // if user stored lat:lon as key, we could embed mapping in app; for simplicity, if it's present in store, skip
      if (!merged.find((c) => c.key === f)) merged.push({ key: f, name: f, lat: null, lon: null });
    });

    // For each default city we dispatch fetch with provided lat/lon
    DEFAULT_CITIES.forEach((c) => {
      dispatch(fetchWeatherForCity({ lat: c.lat, lon: c.lon, cityKey: c.key }));
    });
  };

  useEffect(() => {
    loadList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Poll every 60s
  useInterval(() => {
    loadList();
  }, 60_000);

  return (
    <div className="container">
      <SearchBar />
      <Dashboard />
      <div className="footer">Data updates every 60s (client caching reduces API calls)</div>
    </div>
  );
}
