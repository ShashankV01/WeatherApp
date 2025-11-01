#Weather App

A modern, web-based weather analytics application that provides real-time weather data, forecasts, and interactive visualizations for multiple cities. It offers users an intuitive and visually appealing dashboard to explore current conditions, forecasts, and historical weather trends with live updates and smooth interactivity.
<img width="1539" height="1027" alt="Dashboard_screenshot" src="https://github.com/user-attachments/assets/ce061d63-5869-476f-ba17-7a1c1d2c134b" />


Project Overview:
The Weather Analytics Dashboard is built to simplify how users access and analyze weather information.
Instead of jumping between multiple weather apps or sources, users can:
-View multiple cities' weather data in one unified dashboard.
-Explore temperature, humidity, and wind trends interactively.
-See both short-term forecasts and historical trends.
-Save their favorite locations for quick access.
With features like real-time data, caching, Google authentication, and unit toggling (°C / °F), it combines performance and usability in a clean, responsive design.

Run:
1. copy files into folder
2. `npm install`
3. create `.env` using `.env.example`
4. `npm start`

Problem it solves:
Most weather applications focus only on displaying current temperature and simple forecasts.
However, professionals, travelers, and data enthusiasts often need deeper insights — such as:
-Visual weather trends (hourly & daily)
-Historical data exploration
-Multi-city monitoring
-Personalized dashboards (favorites & preferences)
This project bridges that gap by combining analytics with live weather intelligence, enabling users to make informed decisions quickly and efficiently.

Features:
-Dashboard with city cards (live updates every 60s)
-City detail with hourly + 7-day forecasts + stats
-Search with OpenWeatherMap geocoding autocomplete
-Favorites persisted in localStorage
-Charts (Recharts): hourly/daily temp, precipitation, wind
-Unit toggle (Celsius / Fahrenheit)
-Google Sign-in (Firebase)
-Client-side caching (TTL ~55s) to reduce API calls

Working:
-User signs in using Google Authentication (Firebase).
-The dashboard loads user’s favorite cities (if any) and fetches live weather data using the OpenWeatherMap API.
-The data is stored in Redux state and cached locally.
-Clicking on a city card opens an analytics modal with visualized forecasts.
-Charts (via Recharts) allow hover insights, zooming, and day/hour filtering.
-All updates occur in real-time, auto-refreshing every 60 seconds.

Tech Stack:
| Category               | Technologies                                  |
| ---------------------- | --------------------------------------------- |
| Frontend               | React (Hooks), Redux Toolkit, Tailwind CSS    |
| Charts & Visualization | Recharts                                      |
| Backend / API          | OpenWeatherMap API                            |
| Authentication         | Firebase (Google Sign-In)                     |
| State Management       | Redux Toolkit                                 |
| Data Handling          | Axios (async API calls), localStorage caching |
| Build Tool             | Vite / Create React App                       |
| Version Control        | Git & GitHub                                  |

