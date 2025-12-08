// src/components/Cart.jsx
import React from "react";
import { useCart } from "../state/CartProvider";
import PurchaseForm from "./PurchaseForm";

export default function Cart() {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  const changeQuantityBy = (id, delta) => {
    const item = cartItems.find((c) => c._id === id);
    if (!item) return;
    const newQty = Number(item.quantity || 0) + delta;
    updateItemQuantity(id, newQty);
  };

  return (
    <div>
      <h2>Cart</h2>
      {cartItems.length === 0 ? (
        <div>Your cart is empty</div>
      ) : (
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #eee" }}>Product</th>
              <th style={{ textAlign: "center", borderBottom: "1px solid #eee" }}>Quantity</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #eee" }}>Price</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #eee" }}>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td style={{ padding: 8 }}>{item.description ?? "Product"}</td>
                <td style={{ textAlign: "center" }}>
                  <button onClick={() => changeQuantityBy(item._id, -1)}>-</button>
                  <span style={{ margin: "0 8px" }}>{item.quantity}</span>
                  <button onClick={() => changeQuantityBy(item._id, +1)}>+</button>
                </td>
                <td style={{ textAlign: "right" }}>
                  ${(Number(item.price || 0) * Number(item.quantity || 0)).toFixed(2)}
                </td>
                <td style={{ textAlign: "right" }}>
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div style={{ marginTop: 12, textAlign: "right", fontWeight: 700 }}>
        Total: ${getCartTotal().toFixed(2)}
      </div>

      <div style={{ marginTop: 16 }}>
        <PurchaseForm />
      </div>
    </div>
  );
}
