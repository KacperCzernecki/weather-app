import { useState, useEffect } from "react";
import axios from "axios";

export function useWeather(city) {
  const [weatherData, setWeatherData] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);
  const [weatherError, setWeatherError] = useState(null);
  const apiKey = import.meta.env.VITE_API_KEY;

  useEffect(() => {
    if (!apiKey) {
      setWeatherLoading(false);
      setWeatherError(new Error("Missing API key"));
      return;
    }
    if (!city) {
      setWeatherLoading(false);
      return;
    }
    const fetchData = async () => {
      setWeatherData(null);
      setWeatherError(null);
      setWeatherLoading(true);
      try {
        const res = await axios.get(
          `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(city)}?unitGroup=metric&key=${apiKey}`,
        );
        setWeatherData(res.data);
      } catch (err) {
        setWeatherError(err);
      } finally {
        setWeatherLoading(false);
      }
    };

    fetchData();
  }, [city, apiKey]);

  return { weatherData, weatherLoading, weatherError };
}
