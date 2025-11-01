import React from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import CityDetails from "../components/CityDetails";

export default function CityPage() {
  const { cityKey } = useParams();
  const city = useSelector((s) => s.weather.cities[cityKey]);

  if (!city) {
    return (
      <div className="container">
        <p>No cached data for this city yet. Click a card on the dashboard or search to add it.</p>
      </div>
    );
  }

  return (
    <div className="container">
      <CityDetails cityKey={cityKey} data={city} />
    </div>
  );
}
