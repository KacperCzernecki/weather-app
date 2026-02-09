import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [cityInput, setCityInput] = useState("");
  const [city, setCity] = useState("Warszawa");
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
  if (!data) return null;
  return (
    <div className="container">
      <input
        type="text"
        value={cityInput}
        placeholder="Enter a City"
        onChange={(e) => setCityInput(e.target.value)}
      />
      <button onClick={handleClick}>Search</button>
      <h2>Weather in {city}</h2>
      <p>Temperature: {data.currentConditions.temp}°C</p>
      <p>Humidity: {data.currentConditions.humidity}%</p>
    </div>
  );
}

export default App;
