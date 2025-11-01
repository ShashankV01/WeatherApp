import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addFavourite, removeFavourite } from "../features/weatherSlice";

function formatTemp(t, unit) {
  if (t == null) return "—";
  if (unit === "metric") return `${Math.round(t)}°C`;
  return `${Math.round(t * 9/5 + 32)}°F`;
}

export default function CityCard({ cityKey, data, unit }) {
  const dispatch = useDispatch();
  const current = data.current || {};
  const icon = current.weather && current.weather[0] ? `https://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png` : null;

  function toggleFav(e) {
    e.preventDefault();
    e.stopPropagation();
    // simplistic: if key in favourites handled at parent, but include actions for completeness
    // dispatch logic handled at parent ideally
    // here we just toggle using stored favourites from localStorage
    const favs = JSON.parse(localStorage.getItem("wa:favs") || "[]");
    if (favs.includes(cityKey)) {
      dispatch(removeFavourite(cityKey));
    } else {
      dispatch(addFavourite(cityKey));
    }
  }

  return (
    <Link to={`/city/${encodeURIComponent(cityKey)}`} className="city-card" style={{ textDecoration: "none", color: "inherit" }}>
      <div className="card-header">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontWeight: 700 }}>{cityKey}</div>
          <div style={{ fontSize: 12, color: "#9fb" }}>{data.meta?.lat ? `${data.meta.lat.toFixed(2)}, ${data.meta.lon.toFixed(2)}` : ""}</div>
        </div>
        <button onClick={toggleFav} title="Toggle favorite">★</button>
      </div>

      <div className="card-body">
        {icon && <img className="city-icon" src={icon} alt="weather" />}
        <div>
          <div className="temp">{formatTemp(current.temp, unit)}</div>
          <div style={{ color: "#9fb", fontSize: 13 }}>{current.weather && current.weather[0] ? current.weather[0].main : ""}</div>
        </div>
      </div>

      <div className="quick-info">
        <div>Humidity: {current.humidity ?? "—"}%</div>
        <div>Wind: {current.wind_speed ?? "—"} m/s</div>
        <div>Pressure: {current.pressure ?? "—"} hPa</div>
      </div>
    </Link>
  );
}
