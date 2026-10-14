import { getWeatherData, weatherObj } from "./weather.js";
import { createWeatherCard, createLoadingCard, showErrorCard } from "./DOM.js";

import { convertToCelsius, convertToFahrenheit } from "./helpers.js";
import { validateInput } from "./validateInput.js";

const input = document.getElementById("search-location");
const form = document.forms[0];
const converterBtn = document.getElementById("converter");

function sendLocation(e) {
  e.preventDefault();

  // check the validity of the input
  validateInput();
  if (!form.checkValidity()) return;

  createLoadingCard(); // add the loading component

  getWeatherData(input.value, weatherObj.weatherData.unit || "C")
    .then((result) => {
      createWeatherCard(result);
    })
    .catch(() => {
      showErrorCard("Location not found....");
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

  // rebuild the card only if the it has valid weather content in it
  if (document.querySelector("#card-container .degree")) {
    createWeatherCard(weatherObj.weatherData);
  }
}

form.addEventListener("submit", sendLocation);
converterBtn.addEventListener("click", switchDegrees);
input.addEventListener("change", validateInput);
