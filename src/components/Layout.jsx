// src/components/Layout.jsx
import React from "react";
import Header from "./Header";

export default function Layout({ children, onSearch }) {
  return (
    <div className="App">
      <Header onSearch={onSearch} />

      <div className="main-content" style={{ padding: "20px" }}>
        {children}
      </div>
    </div>
  );
}
