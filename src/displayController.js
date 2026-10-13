import { getWeatherData } from "./weather.js";
import { createSearchForm } from "./DOM.js";

createSearchForm()
const input = document.getElementById("search-location")
const form = document.forms[0]

function sendLocation(e){
    e.preventDefault()
    getWeatherData(input.value)
    form.reset()
}
form.addEventListener("submit", sendLocation)