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
    textContent: "Search",
  });
  const searchInput = createDOMElement({
    elemType: "input",
    id: "search-location",
  });
  const submitBtn = createDOMElement({
    elemType: "button",
    textContent: "search",
  });

  div.append(label, searchInput);
  form.append(div, submitBtn);
  document.body.append(form);

  return form;
}

function createWeatherCard({ resolvedAddress, temp, conditions }) {
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
    textContent: temp,
  });

  const conditionsDiv = createDOMElement({
    elemType: "div",
    id: "conditions",
    textContent: conditions,
  });

  container.append(addressDiv, tempDiv, conditionsDiv);
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

export { createSearchForm, createWeatherCard, createConverterButton };
