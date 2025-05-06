import React, { useState } from "react";
import { useCart } from "../state/CartProvider";

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();
  const [email, setEmail] = useState("");

  const handlePurchase = () => {
    if (!email) {
      alert("Please enter an email address to complete the purchase.");
      return;
    }
    
    console.log("Purchasing with email:", email);
    console.log("Cart items:", cartItems);
    alert(`Purchase successful! A confirmation has been sent to ${email}`);
    
    // Clear cart or send data to backend
  };

  return (
    <div className="center mw7 ba mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Shopping Cart</h2>
        {cartItems.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <>
            <table className="w-100">
              <thead>
                <tr>
                  <th className="tl pv2">Product</th>
                  <th className="tl pv2">Quantity</th>
                  <th className="tl pv2">Price</th>
                  <th className="tl pv2">Action</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item._id}>
                    <td className="tl pv2">{item.name || "Unnamed Product"}</td>
                    <td className="tl pv2">
                      <button
                        onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                        className="bg-light-gray black pa2 br2 mr2"
                        disabled={item.quantity <= 1}
                      >
                        -
                      </button>
                      {item.quantity}
                      <button
                        onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                        className="bg-light-gray black pa2 br2 ml2"
                      >
                        +
                      </button>
                    </td>
                    <td className="tl pv2">${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        onClick={() => removeFromCart(item)}
                        className="bg-red white pa2 br2"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="mt3">Total: ${getCartTotal().toFixed(2)}</h3>

            {/* Email Address Input for Checkout */}
            <div className="mt3">
              <input
                type="email"
                placeholder="Enter your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pa2 ba br2 w-100 mb2"
              />
              <button
                onClick={handlePurchase}
                className="bg-black white pa3 br2 w-100"
              >
                Purchase
              </button>
              <small className="db mt2">Enter your email address to complete the purchase</small>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;