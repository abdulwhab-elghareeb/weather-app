import { getWeatherData, weatherObj } from "./weather.js";
import {
  createWeatherCard,
  createLoadingCard,
  initialRendering,
} from "./DOM.js";

import { convertToCelsius, convertToFahrenheit } from "./helpers.js";

initialRendering(); // renders the form and the initial card

const input = document.getElementById("search-location");
const form = document.forms[0];
const converterBtn = document.getElementById("converter");

function sendLocation(e) {
  e.preventDefault();

  const weatherData = getWeatherData(input.value, weatherObj.weatherData.unit || "C");
  createLoadingCard();

  weatherData.then((result) => {
    weatherObj.weatherData = result;
    createWeatherCard(result);
  });

  form.reset();
}

function switchDegrees() {
  // if the data still fetching
  if (document.querySelector("#card-container svg")) return;

  if (converterBtn.className === "F") {
    // modifying the button
    converterBtn.className = "C";
    converterBtn.textContent = "℃";

    // modifying the data
    weatherObj.weatherData.unit = "C";
    weatherObj.weatherData.temp = convertToCelsius(weatherObj.weatherData.temp);
  } else {
    converterBtn.className = "F";
    converterBtn.textContent = "℉";

    weatherObj.weatherData.unit = "F";
    weatherObj.weatherData.temp = convertToFahrenheit(
      weatherObj.weatherData.temp,
    );
  }

  // rebuild the card only if the card has valid content in it
  if (document.querySelector("#card-container .degree")) {
    createWeatherCard(weatherObj.weatherData);
  }
}

form.addEventListener("submit", sendLocation);
converterBtn.addEventListener("click", switchDegrees);
