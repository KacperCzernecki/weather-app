import React from "react";
import { useWeather } from "../hooks/useWeather";
import { useState, useEffect } from "react";
import WeatherSkeleton from "./WeatherSkeleton";
import "./WeatherInfo.css";

function WeatherInfo({ city }) {
  const [currentCity, setCurrentCity] = useState(city);
  const { weatherData, weatherLoading, weatherError } = useWeather(city);

  useEffect(() => {
    setCurrentCity(city);
  }, [city]);

  if (weatherLoading) return <WeatherSkeleton />;
  if (weatherError) return <div>Error: {weatherError.message}</div>;
  if (!weatherData) return null;

  const { currentConditions } = weatherData;
  const todayDisplay = `${weatherData.days[0].datetime.split("-")[2]}.${weatherData.days[0].datetime.split("-")[1]}.${weatherData.days[0].datetime.split("-")[0]}`;

  const getToolTip = (conditions) => {
    const {
      temp: temperature,
      humidity,
      windspeed,
      visibility,
      pressure,
    } = conditions;

    const tooltips = [];

    if (temperature !== undefined && humidity !== undefined) {
      if (temperature < 0 && humidity > 80) {
        tooltips.push(
          "Very cold and damp – dress warmly, gloves and a hat are essential, and be careful on slippery sidewalks.",
        );
      } else if (temperature < 10 && humidity > 80) {
        tooltips.push(
          "Cold and damp – a light jacket, layered clothing, and caution outdoors.",
        );
      } else if (temperature >= 25 && humidity > 80) {
        tooltips.push(
          "Hot and humid – drink plenty of water and avoid overheating.",
        );
      } else {
        tooltips.push(
          `Currently ${temperature}°C and humidity ${humidity}% – adjust your clothing for comfort.`,
        );
      }
    }

    if (temperature !== undefined && windspeed !== undefined) {
      if (windspeed > 30 && temperature < 10) {
        tooltips.push(
          "Strong winds and low temperatures – dress very warmly and watch out for gusts.",
        );
      } else if (windspeed > 30 && temperature >= 25) {
        tooltips.push(
          "Strong wind on a hot day – possible feeling of cold or hindrance to walking.",
        );
      } else if (windspeed >= 10) {
        tooltips.push(
          `Wind ${windspeed} km/h – may be a nuisance when walking or cycling.`,
        );
      }
    }

    if (visibility !== undefined) {
      if (visibility < 1) {
        tooltips.push("Visibility is very limited – please drive carefully.");
      } else if (visibility < 5) {
        tooltips.push("Visibility is limited – be careful.");
      }
    }
    if (pressure !== undefined) {
      if (pressure < 1000) {
        tooltips.push("Low blood pressure – possible low mood or headaches.");
      } else if (pressure > 1020) {
        tooltips.push("High pressure – stable and sunny weather.");
      }
    }

    return tooltips.join(" ");
  };
  return (
    <div>
      <div className="weather-info">
        <h1>
          {currentCity}
          <img
            src={`src/assets/${currentConditions.icon}.svg`}
            alt={currentConditions.icon}
          />
        </h1>
        <p>
          <p>{todayDisplay}</p>
        </p>
        <p>
          <b>☁️Conditions: {currentConditions.conditions}</b>
          <span className="info-wrapper">
            <img src="src/assets/info.svg" alt="Info icon" />
            <span className="tooltip">{getToolTip(currentConditions)}</span>
          </span>
        </p>
        <p>
          <b>🌡️Temperature: {currentConditions.temp}°C</b> (Feels like:{" "}
          {currentConditions.feelslike}°C)
        </p>
        <p>
          <b>💧Humidity: {currentConditions.humidity}%</b>
        </p>
        <p>
          <b>💨Wind speed: {currentConditions.windspeed} m/s</b>
        </p>
        <p>
          <b>👀Visibility: {currentConditions.visibility} km</b>
        </p>
        <p>
          <b>⚖️Pressure: {currentConditions.pressure} hPa</b>
        </p>
      </div>
    </div>
  );
}

export default WeatherInfo;
