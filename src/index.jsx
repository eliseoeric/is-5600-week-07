import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "tachyons/css/tachyons.min.css";
import App from "./App";
import { CartProvider } from "./state/CartProvider";
import { BrowserRouter } from "react-router-dom";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <App />
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
