import { BASE_URL } from "../config";
import { useCart } from "../state/CartProvider";

export default function Cart() {
  const { cartItems, updateQuantity, removeItem, clearCart, cartTotal } =
    useCart();

  const createOrder = () => {
    fetch(`${BASE_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        buyerEmail: "student@example.com",
        products: cartItems.map((item) => item._id),
        status: "pending",
      }),
    })
      .then((res) => res.json())
      .then(() => {
        clearCart();
        alert("Order created successfully!");
      });
  };

  return (
    <div className="pa4">
      <h1>Cart</h1>

      {cartItems.length === 0 && <p>Your cart is empty.</p>}

      {cartItems.map((item) => (
        <div key={item._id} className="ba b--black-20 pa3 mb3">
          <h3>{item.description || item.alt_description}</h3>
          <p>Price: ${item.price || 0}</p>

          <label>
            Quantity:
            <input
              className="ml2 pa1"
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => updateQuantity(item._id, e.target.value)}
            />
          </label>

          <button
            className="ml3 pa2 pointer"
            onClick={() => removeItem(item._id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${cartTotal.toFixed(2)}</h2>

      {cartItems.length > 0 && (
        <button className="pa3 bg-black white pointer" onClick={createOrder}>
          Create Order
        </button>
      )}
    </div>
  );
}