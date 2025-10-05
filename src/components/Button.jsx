// src/components/Button.jsx
import React from "react";

export default function Button({ text, handleClick, disabled }) {
  return (
    <button
      onClick={handleClick}
      disabled={disabled}
      style={{
        padding: "0.5rem 1rem",
        margin: "0 0.5rem",
        borderRadius: 6,
        border: "1px solid #ccc",
        background: "#fff",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
