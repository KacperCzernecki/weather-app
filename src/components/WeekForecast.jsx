import React from "react";
import "./WeekForecast.css";
import { useWeather } from "../hooks/useWeather";

function WeekForecast({ city }) {
  const { weatherData } = useWeather(city);

  if (!weatherData) return null;
  return (
    <div className="forecast-container">
      {weatherData.days.slice(1, 8).map((day, index) => (
        <div key={index} className="day-forecast">
          <p>{`${day.datetime.split("-")[2]}.${day.datetime.split("-")[1]}`}</p>
          <p>{day.temp}°C</p>
          <img src={`src/assets/${day.icon}.svg`} alt={day.icon} />
        </div>
      ))}
    </div>
  );
}

export default WeekForecast;
