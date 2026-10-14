import { createDOMElement } from "./helpers.js";

function cleanCard() {
  const card = document.getElementById("card-container");
  if (card) {
    card.remove();
  }
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
  });

  const submitBtn = createDOMElement({
    elemType: "button",
    textContent: "search",
  });

  div.append(searchInput, submitBtn);
  form.append(label, div);
  document.body.append(form);

  return form;
}

function createWeatherCard({ resolvedAddress, temp, conditions, icon }) {
  cleanCard(); // first remove the card

  const container = createDOMElement({ elemType: "div", id: "card-container" });

  const addressDiv = createDOMElement({
    elemType: "div",
    id: "address",
    textContent: resolvedAddress,
  });

  const tempDiv = createDOMElement({
    elemType: "div",
    id: "temp",
    className: "degree",
    textContent: temp,
  });

  const conditionsDiv = createDOMElement({
    elemType: "div",
    id: "conditions",
    textContent: conditions,
  });

  const weatherIconImg = createDOMElement({ elemType: "img" });
  import(`./assets/${icon}.svg`).then(
    (iconModule) => (weatherIconImg.src = iconModule.default),
  );

  container.append(addressDiv, tempDiv, conditionsDiv, weatherIconImg);
  document.body.append(container);
}

function createConverterButton() {
  const button = createDOMElement({
    elemType: "button",
    id: "converter",
    className: "F",
    textContent: "Fahrenheit",
  });

  document.body.append(button);
}

function createLoadingCard() {
  cleanCard();
  const container = createDOMElement({ elemType: "div", id: "card-container" });
  const svg = createDOMElement({ elemType: "svg", viewBox: "25 25 50 50" });
  const circle = createDOMElement({
    elemType: "circle",
    r: "20",
    cy: "50",
    cx: "50",
  });
  svg.append(circle);
  container.append(svg);
  document.body.append(container);
}

export {
  createSearchForm,
  createWeatherCard,
  createConverterButton,
  createLoadingCard,
};
