import { useContext } from "react";
import { CartContext } from "../context/CartContext";

const Cart = ({ onOrderPlaced }) => {
  const { cart, clearCart } = useContext(CartContext);

  const placeOrder = () => {
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((newOrder) => {
        clearCart();
        onOrderPlaced(newOrder);
      });
  };

  return (
    <div className="mt4">
      <h2 className="f3">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul>
            {cart.map((item, index) => (
              <li key={index}>{item.name} - ${item.price}</li>
            ))}
          </ul>
          <button className="bg-green white pa2 br2 mt2" onClick={placeOrder}>
            Place Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
