import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("");
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setLoading(false);
      setError(new Error("Missing API key"));
      return;
    }
    if (!city) {
      setLoading(false);
      return;
    }
    const fetchData = async () => {
      setData(null);
      setError(null);
      setLoading(true);
      try {
        const res = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}`,
        );
        setData(res.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [city, apiKey]);

  const handleClick = () => {
    if (!cityInput.trim()) return;
    setCity(cityInput);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  return (
    <div className="container">
      <h1>Weather app</h1>
      <input
        className="weatherInput"
        type="text"
        value={cityInput}
        placeholder="Enter a City"
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
      {data && (
        <div className="weather-info">
          <h1>
            {city}
            <img
              src={`src/assets/${data.currentConditions.icon}.svg`}
              alt={data.currentConditions.icon}
            />
          </h1>
          <p>
            <b>☁️Conditions: {data.currentConditions.conditions}</b>
          </p>
          <p>
            <b>🌡️Temperature: {data.currentConditions.temp}°C</b> (Feels like:{" "}
            {data.currentConditions.feelslike}°C)
          </p>
          <p>
            <b>💧Humidity: {data.currentConditions.humidity}%</b>
          </p>
          <p>
            <b>💨Wind speed: {data.currentConditions.windspeed} m/s</b>
          </p>
          <p>
            <b>👀Visibility: {data.currentConditions.visibility} km</b>
          </p>
          <p>
            <b>⚖️Pressure: {data.currentConditions.pressure} hPa</b>
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
