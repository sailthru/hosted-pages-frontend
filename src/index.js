import React from "react";
import ReactDOM from "react-dom";

import App from "./App";

document.addEventListener("DOMContentLoaded", () => {
  const rootNode = document.getElementById("app");
  ReactDOM.render(<App />, rootNode);
});
