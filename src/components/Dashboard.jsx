import React from "react";
import { useSelector } from "react-redux";
import CityCard from "./CityCard";

/**
 * Dashboard shows all cities currently in store.cities.
 * Also shows favourites pinned first.
 */

export default function Dashboard() {
  const cities = useSelector((s) => s.weather.cities);
  const favourites = useSelector((s) => s.weather.favourites);
  const unit = useSelector((s) => s.weather.unit);

  const orderKeys = [
    ...favourites.filter((k) => cities[k]),
    ...Object.keys(cities).filter((k) => !favourites.includes(k))
  ];

  return (
    <div className="grid-cards">
      {orderKeys.length === 0 && <div style={{ color: "#9fb" }}>No cities loaded yet — search to add a city.</div>}
      {orderKeys.map((key) => (
        <CityCard key={key} cityKey={key} data={cities[key]} unit={unit} />
      ))}
    </div>
  );
}
