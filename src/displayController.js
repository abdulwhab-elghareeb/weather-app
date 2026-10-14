import { getWeatherData } from "./weather.js";
import {
  createWeatherCard,
  createLoadingCard,
  showErrorCard,
  createInitialCard,
} from "./DOM.js";
import { convertToCelsius, convertToFahrenheit } from "./helpers.js";
import { validateInput } from "./validateInput.js";

const input = document.getElementById("search-location");
const form = document.forms[0];
let converterBtn; // well be assigned after the first form submission
let weatherData;

async function displayWeatherData() {
  try {
    const unit = weatherData ? weatherData.unit : "C";
    const data = await getWeatherData(input.value, unit);
    weatherData = data;
    createWeatherCard(data);
  } catch {
    showErrorCard("Location not found....");
  }
}

function sendLocation(e) {
  e.preventDefault();

  // check the validity of the input
  validateInput();
  if (!form.checkValidity()) return;

  // create the container if it doesn't exist
  if (!document.getElementById("card-container")) {
    createInitialCard();
    converterBtn = document.getElementById("converter");
    converterBtn.addEventListener("click", switchDegrees);
  }

  createLoadingCard(); // add the loading component
  displayWeatherData();
  form.reset();
}

function switchDegrees() {
  // if the data still fetching
  if (document.querySelector("#card-container svg")) return;

  if (converterBtn.className === "F") {
    converterBtn.className = "C";
    converterBtn.textContent = "℃";

    weatherData.unit = "C";
    weatherData.temp = convertToCelsius(weatherData.temp);
  } else {
    converterBtn.className = "F";
    converterBtn.textContent = "℉";

    weatherData.unit = "F";
    weatherData.temp = convertToFahrenheit(weatherData.temp);
  }

  // rebuild the card only if it has valid weather content
  if (document.querySelector("#card-container .degree")) {
    createWeatherCard(weatherData);
  }
}

form.addEventListener("submit", sendLocation);
input.addEventListener("change", validateInput);
