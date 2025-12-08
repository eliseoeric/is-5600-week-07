import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce(
    (s, i) => s + (i.product.price ?? 0) * i.quantity,
    0
  );

  if (!items.length)
    return (
      <div className="pa4">
        <h1 className="f3 mb3">Your cart is empty</h1>
        <Link to="/" className="link dim blue">← Back</Link>
      </div>
    );

  return (
    <div className="pa4">
      <h1 className="f3 mb3">Your Cart</h1>

      <ul className="list pl0">
        {items.map((i) => (
          <li key={i.id} className="flex justify-between pv2 bb b--black-10">
            <div>
              <div className="b">
                {i.product.description || i.product.name || "Untitled"}
              </div>
              <div className="gray">
                Qty: {i.quantity} | Price: ${(i.product.price ?? 0).toFixed(2)}
              </div>
            </div>

            <button className="link dim red" onClick={() => removeItem(i.id)}>
              Remove
            </button>
          </li>
        ))}
      </ul>

      <div className="mt3 b">Total: ${total.toFixed(2)}</div>

      <button className="mt3" onClick={clearCart}>Clear Cart</button>
    </div>
  );
}
