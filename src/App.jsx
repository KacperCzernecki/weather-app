import { useState } from "react";
import SearchBar from "./components/SearchBar";
import WeatherInfo from "./components/WeatherInfo";
import WeekForecast from "./components/WeekForecast";
import "./App.css";

function App() {
  const [city, setCity] = useState("");

  return (
    <div className="container">
      <h1>Weather app</h1>
      <SearchBar onCitySelect={setCity} />
      {city && <WeatherInfo city={city} />}
      {city && <WeekForecast city={city} />}
    </div>
  );
}

export default App;
