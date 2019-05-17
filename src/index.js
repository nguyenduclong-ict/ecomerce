import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

// Import config file
import * as config from "./helpers/config.js";
process.config = config;



ReactDOM.render(<App />, document.getElementById("root"));
