import React, { useState } from "react";
import weatherApi from "../services/weatherApi";
import { useDispatch } from "react-redux";
import { fetchWeatherForCity, addFavourite } from "../features/weatherSlice";
import { useNavigate } from "react-router-dom";

/**
 * Search with OpenWeatherMap geocoding.
 * On select: dispatch fetchWeatherForCity and optionally add to favourites.
 */

export default function SearchBar() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  async function onChange(e) {
    const v = e.target.value;
    setQ(v);
    if (v.length < 2) {
      setResults([]);
      return;
    }
    try {
      const res = await weatherApi.geocode(v);
      // res items: { name, lat, lon, country, state }
      setResults(res.map((r) => ({ label: `${r.name}${r.state ? ", " + r.state : ""}, ${r.country}`, lat: r.lat, lon: r.lon })));
    } catch (err) {
      console.error(err);
      setResults([]);
    }
  }

  function onSelect(item) {
    const key = `${item.lat.toFixed(4)}:${item.lon.toFixed(4)}`;
    dispatch(fetchWeatherForCity({ lat: item.lat, lon: item.lon, cityKey: key }));
    // automatically add to favourites for convenience
    dispatch(addFavourite(key));
    setQ("");
    setResults([]);
    navigate(`/city/${encodeURIComponent(key)}`);
  }

  return (
    <div className="searchbar">
      <input value={q} onChange={onChange} placeholder="Search city (e.g. Mumbai, New York)..." />
      <div style={{ position: "relative" }}>
        {results.length > 0 && (
          <ul className="search-results" style={{ listStyle: "none", margin: 0, padding: 8, background: "rgba(0,0,0,0.45)", borderRadius: 6 }}>
            {results.map((r, i) => (
              <li key={i} style={{ padding: 6, cursor: "pointer" }} onClick={() => onSelect(r)}>
                {r.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
