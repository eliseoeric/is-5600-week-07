// src/components/Button.jsx
import React from "react";

export default function Button({ text, handleClick }) {
  return (
    <button
      onClick={handleClick}
      className="f5 no-underline black bg-animate hover-bg-black hover-white inline-flex items-center pa3 ba border-box mr4 br3 pointer"
      type="button"
    >
      <span className="pl1">{text}</span>
    </button>
  );
}
