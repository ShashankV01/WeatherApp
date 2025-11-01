import React, { useMemo } from "react";
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, BarChart, Bar, AreaChart, Area, Legend } from "recharts";
import dayjs from "dayjs";

/**
 * WeatherCharts displays:
 * - Hourly temperature (24h)
 * - 7-day min/max area
 * - Precipitation bar
 * - Wind speed line
 */

function buildHourlyData(hourly) {
  return (hourly || []).slice(0, 24).map((h) => ({
    time: dayjs.unix(h.dt).format("HH:mm"),
    temp_c: h.temp,
    temp_f: h.temp * 9 / 5 + 32,
    pop: Math.round(h.pop * 100),
    wind: h.wind_speed
  }));
}

function buildDailyData(daily) {
  return (daily || []).slice(0, 7).map((d) => ({
    date: dayjs.unix(d.dt).format("DD MMM"),
    min: d.temp.min,
    max: d.temp.max,
    pop: Math.round((d.pop ?? 0) * 100),
    wind: d.wind_speed
  }));
}

export default function WeatherCharts({ hourly, daily }) {
  const hourlyChart = useMemo(() => buildHourlyData(hourly), [hourly]);
  const dailyChart = useMemo(() => buildDailyData(daily), [daily]);

  return (
    <div style={{ display: "grid", gap: 18 }}>
      <div style={{ width: "100%", height: 280 }}>
        <h4>Hourly Temperature (24h)</h4>
        <ResponsiveContainer>
          <LineChart data={hourlyChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temp_c" name="Temp (°C)" />
            <Line type="monotone" dataKey="wind" name="Wind (m/s)" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 260 }}>
        <h4>7-Day Temperature Range</h4>
        <ResponsiveContainer>
          <AreaChart data={dailyChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Area type="monotone" dataKey="max" name="Max" />
            <Area type="monotone" dataKey="min" name="Min" />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div style={{ width: "100%", height: 180 }}>
        <h4>Precipitation Probability</h4>
        <ResponsiveContainer>
          <BarChart data={dailyChart}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="pop" name="Precip (%)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
