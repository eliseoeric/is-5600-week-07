import { useContext } from "react";
import { CartContext } from "../state/CartProvider";

function Cart() {
  const { cart, clearCart } = useContext(CartContext);

  const handleCheckout = async () => {
    await fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ items: cart })
    });

    clearCart();
  };

  return (
    <div>
      <h2>Cart</h2>

      {cart.map((item, i) => (
        <p key={i}>{item.name}</p>
      ))}

      {cart.length > 0 && (
        <button onClick={handleCheckout}>
          Checkout
        </button>
      )}
    </div>
  );
}

export default Cart;