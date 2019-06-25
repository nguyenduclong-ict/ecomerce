import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// Import config file
import config from "./helpers/config.js";
process.config = config;

ReactDOM.render(<App />, document.getElementById("root"));
serviceWorker.unregister();
