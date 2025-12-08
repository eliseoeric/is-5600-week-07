// src/components/Search.jsx
import React, { useState } from "react";

export default function Search({ handleSearch }) {
  const [q, setQ] = useState("");
  return (
    <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by tag..." style={{ flex: 1, padding: 8 }} />
      <button onClick={() => handleSearch(q)} style={{ padding: "8px 12px" }}>Search</button>
      <button onClick={() => { setQ(""); handleSearch(""); }} style={{ padding: "8px 12px" }}>Reset</button>
    </div>
  );
}
