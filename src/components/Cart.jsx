import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Cart() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce((sum, entry) => {
    const price = entry.product.price ?? 0;
    return sum + price * entry.quantity;
  }, 0);

  if (items.length === 0) {
    return (
      <div className="pa4">
        <h1 className="f3 mb3">Your cart is empty</h1>
        <Link to="/" className="link dim blue">
          ← Back to products
        </Link>
      </div>
    );
  }

  return (
    <div className="pa4">
      <h1 className="f3 mb3">Your Cart</h1>

      <ul className="list pl0">
        {items.map((entry) => (
          <li
            key={entry.id}
            className="flex items-center justify-between pv2 bb b--black-10"
          >
            <div>
              <div className="b">
                {entry.product.description ||
                  entry.product.name ||
                  "Untitled"}
              </div>
              <div className="gray">
                Qty: {entry.quantity} | Price: $
                {(entry.product.price ?? 0).toFixed(2)}
              </div>
            </div>

            <button
              className="link dim red"
              onClick={() => removeItem(entry.id)}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt3 b">Total: ${total.toFixed(2)}</div>

      <div className="mt3">
        <button className="mr2" onClick={clearCart}>
          Clear Cart
        </button>
      </div>
    </div>
  );
}

export default Cart;
