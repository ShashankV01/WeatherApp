import axios from "axios";

/**
 * Client-side caching wrapper (localStorage) with TTL.
 * TTL chosen slightly under 60s to satisfy "no older than 60s" requirement.
 */
const OWM_KEY = process.env.REACT_APP_OWM_KEY;
if (!OWM_KEY) console.warn("REACT_APP_OWM_KEY is not set. Add your OpenWeatherMap API key in .env");

const BASE = "https://api.openweathermap.org";
const CACHE_PREFIX = "wa:cache:";
const TTL_MS = 55 * 1000; // 55 seconds

function makeCacheKey(key) {
  return `${CACHE_PREFIX}${key}`;
}

function cacheGet(key) {
  try {
    const raw = localStorage.getItem(makeCacheKey(key));
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (Date.now() - parsed.ts > TTL_MS) {
      localStorage.removeItem(makeCacheKey(key));
      return null;
    }
    return parsed.value;
  } catch (e) {
    return null;
  }
}

function cacheSet(key, value) {
  try {
    localStorage.setItem(makeCacheKey(key), JSON.stringify({ ts: Date.now(), value }));
  } catch (e) {}
}

async function geocode(q) {
  const key = `geocode:${q}`;
  const cached = cacheGet(key);
  if (cached) return cached;
  const url = `${BASE}/geo/1.0/direct?q=${encodeURIComponent(q)}&limit=5&appid=${OWM_KEY}`;
  const res = await axios.get(url);
  cacheSet(key, res.data);
  return res.data;
}

async function getWeather({ lat, lon }) {
  const key = `onecall:${lat}:${lon}`;
  const cached = cacheGet(key);
  if (cached) return cached;

  // Using One Call API (data/2.5/onecall)
  const url = `${BASE}/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&units=metric&appid=${OWM_KEY}`;
  const res = await axios.get(url);
  const payload = {
    meta: { lat, lon },
    current: res.data.current,
    hourly: res.data.hourly, // up to 48
    daily: res.data.daily // up to 8
  };
  cacheSet(key, payload);
  return payload;
}

export default {
  geocode,
  getWeather
};
