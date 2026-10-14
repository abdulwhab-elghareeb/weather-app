const input = document.querySelector("input");
const inputSpan = input.nextElementSibling;

export function showErrorMessage(message, span) {
  span.classList.add("active");
  span.textContent = message;
}

export function resetSpan(span) {
  span.textContent = "";
  span.classList.remove("active");
}

export function validateInput() {
  resetSpan(inputSpan);

  if (input.validity.valueMissing) {
    showErrorMessage("Enter a location", inputSpan);
  }
}
