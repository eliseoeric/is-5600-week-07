import { useEffect, useState } from "react";
import { BASE_URL } from "../config";

export default function CardList() {
  const [products, setProducts] = useState(null);
  const [err, setErr] = useState(null);

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then(async (r) => {
        if (!r.ok) throw new Error(`${r.status}`);
        return r.json();
      })
      .then(setProducts)
      .catch((e) => setErr(`error: ${e.message}`));
  }, []);

  if (err) return <div style={{color:'red'}}>{err}</div>;
  if (!products) return <div>Loading…</div>;

  return (
    <ul style={{maxWidth: 640, margin: "2rem"}}>
      {products.map((p) => (
        <li key={p._id} style={{marginBottom:"1rem"}}>
          <b>{p.title}</b> — ${p.price}
          <div>{p.description}</div>
        </li>
      ))}
    </ul>
  );
}
