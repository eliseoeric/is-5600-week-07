// src/main.jsx
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css"; // optional, keep if you have global CSS

const container = document.getElementById("root");
if (!container) {
  console.error("No #root element found in index.html");
} else {
  const root = createRoot(container);
  root.render(<App />);
}
