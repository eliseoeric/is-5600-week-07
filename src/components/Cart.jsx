import { useCart } from "../state/CartProvider";

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  if (cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.map((item) => (
        <div
          key={item.id || item._id}
          style={{ border: "1px solid #ccc", margin: "10px", padding: "10px" }}
        >
          <h3>{item.name || item.description || item.alt_description}</h3>

          <p>Price: ${item.price}</p>

          <label>
            Quantity:
            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                updateItemQuantity(item.id || item._id, Number(e.target.value))
              }
            />
          </label>

          <button onClick={() => removeFromCart(item.id || item._id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${getCartTotal().toFixed(2)}</h3>
    </div>
  );
}