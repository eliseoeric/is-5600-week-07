import { useState } from "react";
import Button from "./Button";
import { useCart } from "../context/CartContext";
export default function AddToCart({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  if (!product) return null;

  return (
    <div className="mt3">
      <label className="mr2">
        Qty:
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="pa1 ba b--black-20 w3 ml1"
        />
      </label>

      <Button text="Add to Cart" handleClick={() => addItem(product, Number(qty) || 1)} />
    </div>
  );
}
