import { getWeatherData } from "./weather.js";
import {
  createSearchForm,
  createWeatherCard,
  createConverterButton,
  createLoadingCard,
} from "./DOM.js";

import { convertToCelsius, convertToFahrenheit } from "./helpers.js";

createSearchForm();
createConverterButton();

const query = {
  locationData: {},
};

const input = document.getElementById("search-location");
const form = document.forms[0];
const converterBtn = document.getElementById("converter");

function sendLocation(e) {
  e.preventDefault();

  const locationData = getWeatherData(input.value, converterBtn.className);
  createLoadingCard();

  locationData.then((result) => {
    query.locationData = result;
    query.locationData.unit = converterBtn.className;

    createWeatherCard(result);
  });

  form.reset();
}

function switchDegrees() {
  if (converterBtn.className === "F") {
    converterBtn.className = "C";
    converterBtn.textContent = "Celsius";

    query.locationData.unit = "C";
    query.locationData.temp = convertToCelsius(query.locationData.temp);
  } else {
    converterBtn.className = "F";
    converterBtn.textContent = "Fahrenheit";

    query.locationData.unit = "F";
    query.locationData.temp = convertToFahrenheit(query.locationData.temp);
  }

  createWeatherCard(query.locationData);
}

form.addEventListener("submit", sendLocation);
converterBtn.addEventListener("click", switchDegrees);
