import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../state/CartProvider.jsx";
import { BASE_URL } from "../config.js";

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, clearCart, getCartTotal } = useCart();
  const [email, setEmail] = useState("");
  const nav = useNavigate();

  const placeOrder = async () => {
    if (!cartItems.length) return;
    const body = {
      buyerEmail: email || "demo@example.com",
      products: cartItems.map((i) => i._id),
      status: "CREATED"
    };
    await fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    clearCart();
    nav("/orders");
  };

  return (
    <div className="mv4">
      <h2 className="fw6 f3">Cart</h2>
      {!cartItems.length && <p>Your cart is empty.</p>}

      {cartItems.map((i) => (
        <div key={i._id} className="flex items-center justify-between pv2 bb b--black-10">
          <div className="flex items-center">
            <img src={i.urls?.thumb} alt="" className="br2" style={{ width: 56, height: 56, objectFit: "cover" }} />
            <div className="ml3">
              <div className="fw5">{i.tags?.[0]?.title || "Untitled"}</div>
              <div className="gray f7">${i.likes} each</div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="number" min="1"
              className="ba b--black-30 br2 w3 tc mr2"
              value={i.quantity}
              onChange={(e) => updateItemQuantity(i._id, Number(e.target.value))}
            />
            <button className="link dim red" onClick={() => removeFromCart(i._id)}>Remove</button>
          </div>
        </div>
      ))}

      {!!cartItems.length && (
        <div className="mt3">
          <div className="mb3">
            <label className="db mb1">Email for receipt</label>
            <input
              className="ba b--black-30 br2 pa2 w-100 w-50-ns"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="fw6 mb2">Total: ${getCartTotal()}</div>
          <button className="f6 link dim br2 ba ph3 pv2 bg-black white" onClick={placeOrder}>
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
