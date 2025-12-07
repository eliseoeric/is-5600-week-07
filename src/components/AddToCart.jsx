import React, { useState } from "react";
import Button from "./Button";
import { useCart } from "../context/CartContext";
function AddToCart({ product }) {
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  if (!product) return null;
  const handleAdd = () => {
    const quantity = Number(qty) || 1;
    addItem(product, quantity);
  };
  return (
    <div className="mt3">
      <label className="mr2">
        Qty:{" "}
        <input
          type="number"
          min="1"
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className="pa1 ba b--black-20 w3"
        />
      </label>
      <Button text="Add to Cart" handleClick={handleAdd} />
    </div>
  );
}

export default AddToCart;
