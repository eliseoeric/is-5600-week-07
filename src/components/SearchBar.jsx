// src/components/SearchBar.jsx
import React from "react";

export default function SearchBar({ onSearch }) {
  return (
    <div className="pa3 flex justify-center">
      <input
        type="text"
        placeholder="Tag Search"
        className="pa2 ba b--black-20 w-40"
        onChange={(e) => onSearch(e.target.value)}
      />
      <button className="pa2 ml2 bg-black white bn br2"
        onClick={() => {}}
      >
        Search
      </button>
    </div>
  );
}
