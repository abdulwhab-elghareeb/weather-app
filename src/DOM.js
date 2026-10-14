import { createDOMElement } from "./helpers.js";
import notFoundIcon from "./assets/icons/not-found.svg";

function cleanCardContent() {
  const card = document.getElementById("card-container");
  const converterBtn = card.querySelector("#converter");

  card.replaceChildren(converterBtn);
}

function createSearchForm() {
  const form = createDOMElement({ elemType: "form", noValidate: true });
  const div = document.createElement("div");
  const label = createDOMElement({
    elemType: "label",
    for: "search-location",
    textContent: "Search for a location",
  });

  const searchInput = createDOMElement({
    elemType: "input",
    id: "search-location",
    required: true,
  });
  const errorSpan = createDOMElement({ elemType: "span", className: "error" });

  const submitBtn = createDOMElement({
    elemType: "button",
    textContent: "search",
  });

  div.append(searchInput, errorSpan, submitBtn);
  form.append(label, div);
  document.body.append(form);

  return form;
}

function createWeatherCard({
  resolvedAddress,
  temp,
  unit,
  conditions,
  description,
  icon,
}) {
  cleanCardContent(); // first remove all card content

  const addressDiv = createDOMElement({
    elemType: "div",
    id: "address",
    textContent: resolvedAddress,
  });

  const tempDiv = createDOMElement({
    elemType: "div",
    id: "temp",
    className: `degree ${unit}`,
    textContent: temp,
  });

  const conditionsDiv = createDOMElement({
    elemType: "div",
    id: "conditions",
    textContent: conditions,
  });

  const descriptionDiv = createDOMElement({
    elemType: "div",
    id: "description",
    textContent: description,
  });

  const weatherDescDiv = createDOMElement({
    elemType: "div",
    id: "weather-description",
  });

  const weatherIconImg = createDOMElement({ elemType: "img" });
  import(`./assets/icons/${icon}.svg`).then(
    (iconModule) => (weatherIconImg.src = iconModule.default),
  );

  import(`./assets/images/${icon}.jpg`).then(
    (iconModule) =>
      (document.body.style.backgroundImage = `url("${iconModule.default}")`),
  );

  weatherDescDiv.append(conditionsDiv, descriptionDiv);
  document
    .getElementById("card-container")
    .append(addressDiv, tempDiv, weatherDescDiv, weatherIconImg);
}

function createLoadingCard() {
  cleanCardContent();
  const svg = createDOMElement({ elemType: "svg", viewBox: "25 25 50 50" });
  const circle = createDOMElement({
    elemType: "circle",
    r: "20",
    cy: "50",
    cx: "50",
  });
  svg.append(circle);
  document.getElementById("card-container").append(svg);
}

function createInitialCard() {
  const degreeConverter = createDOMElement({
    elemType: "button",
    id: "converter",
    className: "C",
    textContent: "℃",
  });
  const container = createDOMElement({ elemType: "div", id: "card-container" });

  container.append(degreeConverter);
  document.body.append(container);
}

function showErrorCard(errorMessage) {
  cleanCardContent();

  const errorIcon = createDOMElement({ elemType: "img", id: "not-found-img" });
  const message = createDOMElement({
    elemType: "div",
    textContent: errorMessage,
    id: "error-message",
  });
  errorIcon.src = notFoundIcon;

  document.getElementById("card-container").append(errorIcon, message);
}

export {
  createSearchForm,
  createInitialCard,
  createWeatherCard,
  createLoadingCard,
  showErrorCard,
};
