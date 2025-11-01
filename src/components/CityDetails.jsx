import React from "react";
import dayjs from "dayjs";
import WeatherCharts from "./charts/WeatherCharts";

/**
 * CityDetails shows current, stats and charts:
 * - Current temp, dew point, UV index, pressure etc
 * - Hourly list & 7-day summary
 * - Interactive charts below (WeatherCharts)
 */

export default function CityDetails({ cityKey, data }) {
  const current = data.current || {};
  const hourly = data.hourly || [];
  const daily = data.daily || [];

  return (
    <div className="city-details">
      <h2>{cityKey}</h2>
      <section className="stats" style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 12 }}>
        <div>Temp: {current.temp ?? "—"} °C</div>
        <div>Feels: {current.feels_like ?? "—"} °C</div>
        <div>UV Index: {current.uvi ?? "—"}</div>
        <div>Dew point: {current.dew_point ?? "—"} °C</div>
        <div>Humidity: {current.humidity ?? "—"} %</div>
        <div>Pressure: {current.pressure ?? "—"} hPa</div>
      </section>

      <section style={{ marginTop: 8 }}>
        <h3>Hourly (next 24h)</h3>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: 8 }}>
          {hourly.slice(0, 24).map((h) => (
            <div key={h.dt} style={{ minWidth: 88, background: "rgba(255,255,255,0.02)", padding: 6, borderRadius: 6 }}>
              <div style={{ fontSize: 12 }}>{dayjs.unix(h.dt).format("HH:mm")}</div>
              <div style={{ fontWeight: 700 }}>{Math.round(h.temp)}°C</div>
              <div style={{ fontSize: 12 }}>Pop: {Math.round(h.pop * 100)}%</div>
            </div>
          ))}
        </div>
      </section>

      <section className="charts">
        <WeatherCharts hourly={hourly} daily={daily} />
      </section>
    </div>
  );
}
