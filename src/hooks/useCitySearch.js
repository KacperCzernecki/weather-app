import { useState, useEffect } from "react";
import axios from "axios";

export function useCitySearch(query) {
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!query || query.length < 2) {
      setTimeout(() => setResults([]), 0);
      return;
    }
    const fetchCities = async () => {
      try {
        const res = await axios.get(
          `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=3`,
        );
        setResults(res.data.results || []);
      } catch (err) {
        console.log(err);
      }
    };
    fetchCities();
  }, [query]);

  return { results };
}
