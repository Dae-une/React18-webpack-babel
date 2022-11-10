import React from "react";
import ReactDom from "react-dom/client";
import App from "./layouts/App";

const root = document.getElementById("root");

ReactDom.createRoot(root).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
