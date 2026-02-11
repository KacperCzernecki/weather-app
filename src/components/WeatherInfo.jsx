import React from "react";
import { useWeather } from "../hooks/useWeather";
import { useState, useEffect } from "react";
import "./WeatherInfo.css";

function WeatherInfo({ city }) {
  const [currentCity, setCurrentCity] = useState(city);
  const { weatherData, weatherLoading, weatherError } = useWeather(city);

  useEffect(() => {
    setCurrentCity(city);
  }, [city]);

  if (weatherLoading) return <div>Loading...</div>;
  if (weatherError) return <div>Error: {weatherError.message}</div>;
  if (!weatherData) return null;

  const { currentConditions } = weatherData;

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
          "Bardzo zimno i wilgotno – ubierz się ciepło, rękawice i czapka obowiązkowe, uważaj na śliskie chodniki.",
        );
      } else if (temperature < 10 && humidity > 80) {
        tooltips.push(
          "Zimno i wilgotno – lekka kurtka, warstwowa odzież i ostrożność na zewnątrz.",
        );
      } else if (temperature >= 25 && humidity > 80) {
        tooltips.push(
          "Gorąco i wilgotno – pij dużo wody i unikaj przegrzania.",
        );
      } else {
        tooltips.push(
          `Aktualnie ${temperature}°C i wilgotność ${humidity}% – dostosuj ubranie do komfortu.`,
        );
      }
    }

    if (temperature !== undefined && windspeed !== undefined) {
      if (windspeed > 30 && temperature < 10) {
        tooltips.push(
          "Silny wiatr i niska temperatura – ubierz się bardzo ciepło i uważaj na podmuchy.",
        );
      } else if (windspeed > 30 && temperature >= 25) {
        tooltips.push(
          "Silny wiatr w gorący dzień – możliwe uczucie chłodu lub przeszkoda w spacerze.",
        );
      } else if (windspeed >= 10) {
        tooltips.push(
          `Wiatr ${windspeed} km/h – może przeszkadzać podczas spaceru lub jazdy rowerem.`,
        );
      }
    }

    if (visibility !== undefined) {
      if (visibility < 1) {
        tooltips.push(
          "Widoczność bardzo ograniczona – zachowaj ostrożność podczas jazdy.",
        );
      } else if (visibility < 5) {
        tooltips.push("Widoczność ograniczona – bądź uważny.");
      }
    }
    if (pressure !== undefined) {
      if (pressure < 1000) {
        tooltips.push(
          "Słabe ciśnienie – możliwe niskie samopoczucie lub bóle głowy.",
        );
      } else if (pressure > 1020) {
        tooltips.push("Wysokie ciśnienie – pogoda stabilna i słoneczna.");
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
