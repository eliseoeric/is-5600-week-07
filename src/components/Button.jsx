// src/components/Button.jsx
import React from "react";

export default function Button({ text = "Button", handleClick = () => {} }) {
  return (
    <button onClick={handleClick} style={{ padding: "8px 12px", borderRadius: 6, border: "1px solid #ccc", background: "#f6f6f6" }}>
      {text}
    </button>
  );
}
