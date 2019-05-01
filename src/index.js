import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Import config file
import * as config from "./helpers/config.js";
process.config = config;

window.$.alertError = message => {
  window.$.alert({
    title: "Lỗi",
    content: message,
    type: "red",
    animationSpeed: 100
  });
};

window.$.alertWarning = message => {
  window.$.alert({
    title: "Lưu ý",
    content: message,
    animationSpeed: 100,
    type: "orange"
  });
};

window.$.alertSuccess = message => {
  window.$.alert({
    title: "Thành công",
    content: message,
    animationSpeed: 100,
    type: "green"
  });
};

// custorm library
window.$.showAlert = (title, message) => {
  window.$.alert({
    title: title,
    content: message,
    animation: "bottom",
    animationSpeed: 200
  });
};

ReactDOM.render(<App />, document.getElementById("root"));
