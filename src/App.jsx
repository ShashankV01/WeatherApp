import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CityPage from "./pages/CityPage";
import Header from "./components/Header";
import { initFirebase } from "./firebase/firebaseClient";
import { useDispatch } from "react-redux";
import { loadPersisted } from "./features/weatherSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadPersisted());
    initFirebase(); // init firebase auth listeners (optional)
  }, [dispatch]);

  return (
    <div className="app-root">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/city/:cityKey" element={<CityPage />} />
        </Routes>
      </main>
    </div>
  );
}
