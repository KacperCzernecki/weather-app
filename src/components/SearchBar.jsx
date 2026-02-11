import React from "react";
import { useState } from "react";
import { useCitySearch } from "../hooks/useCitySearch";
import "./SearchBar.css";

const SearchBar = ({ onCitySelect }) => {
  const [cityInput, setCityInput] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const { results } = useCitySearch(cityInput);

  const handleSearch = () => {
    if (!cityInput.trim()) return;
    onCitySelect(cityInput);
    setIsFocused(false);
  };
  const handleEnter = (e) => {
    if (!cityInput.trim()) return;
    if (e.key === "Enter") {
      handleSearch();
    }
  };
  return (
    <div className="form-container">
      <input
        className="weatherInput"
        name="weatherInput"
        type="text"
        value={cityInput}
        placeholder="Enter a City"
        onChange={(e) => setCityInput(e.target.value)}
        onKeyDown={handleEnter}
        onFocus={() => setIsFocused(true)}
      />
      {results.length > 0 && isFocused && (
        <ul className="suggestions">
          {results.map((city) => (
            <li
              key={city.id}
              onClick={() => {
                setCityInput(`${city.name}, ${city.country_code}`);
                setIsFocused(false);
              }}
            >
              {city.name}, {city.country_code}
            </li>
          ))}
        </ul>
      )}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
