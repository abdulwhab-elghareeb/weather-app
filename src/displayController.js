import { getWeatherData, weatherObj } from "./weather.js";
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
let converterBtn;

function sendLocation(e) {
  e.preventDefault();

  // create the container if it doesn't exist
  if (!document.getElementById("card-container")) {
    createInitialCard();
    converterBtn = document.getElementById("converter");
    converterBtn.addEventListener("click", switchDegrees);
  }

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
    converterBtn.className = "C";
    converterBtn.textContent = "℃";

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

  // rebuild the card only if it has valid weather content
  if (document.querySelector("#card-container .degree")) {
    createWeatherCard(weatherObj.weatherData);
  }
}

form.addEventListener("submit", sendLocation);
input.addEventListener("change", validateInput);
