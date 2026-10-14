import "./style.css";
import { createSearchForm } from "./DOM.js";

createSearchForm();

// importing the display module after creating the initial DOM
import("./displayController.js");
