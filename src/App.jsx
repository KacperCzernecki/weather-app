import { useState } from "react";
import { useWeather } from "./hooks/useWeather";
import { useCitySearch } from "./hooks/useCitySearch";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");

  const { weatherData, weatherLoading, weatherError } = useWeather(city);
  const { results } = useCitySearch(cityInput);

  const handleClick = () => {
    if (!cityInput.trim()) return;
    setCity(cityInput);
  };
  const handleEnter = (e) => {
    if (!cityInput.trim()) return;
    if (e.key === "Enter") {
      setCity(cityInput);
    }
  };

  if (weatherLoading) return <div>Loading...</div>;
  if (weatherError) return <div>Error: {weatherError.message}</div>;
  return (
    <div className="container">
      <h1>Weather app</h1>
      <input
        className="weatherInput"
        type="text"
        value={cityInput}
        placeholder="Enter a City"
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={handleEnter}
      />
      <button onClick={handleClick}>Search</button>
      {results.length > 0 && (
        <ul className="suggestions">
          {results.map((city) => (
            <li key={city.id} onClick={() => setCity(city.name)}>
              {city.name}, {city.country_code}
            </li>
          ))}
        </ul>
      )}
      {weatherData && (
        <div className="weather-info">
          <h1>
            {city}
            <img
              src={`src/assets/${weatherData.currentConditions.icon}.svg`}
              alt={weatherData.currentConditions.icon}
            />
          </h1>
          <p>
            <b>☁️Conditions: {weatherData.currentConditions.conditions}</b>
          </p>
          <p>
            <b>🌡️Temperature: {weatherData.currentConditions.temp}°C</b> (Feels
            like: {weatherData.currentConditions.feelslike}°C)
          </p>
          <p>
            <b>💧Humidity: {weatherData.currentConditions.humidity}%</b>
          </p>
          <p>
            <b>💨Wind speed: {weatherData.currentConditions.windspeed} m/s</b>
          </p>
          <p>
            <b>👀Visibility: {weatherData.currentConditions.visibility} km</b>
          </p>
          <p>
            <b>⚖️Pressure: {weatherData.currentConditions.pressure} hPa</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
