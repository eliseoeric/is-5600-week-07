import { useCart } from "../state/CartProvider";

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal
  } = useCart();

  return (
    <div>
      <h2>Cart</h2>

      {cartItems.map(item => (
        <div key={item._id}>
          <p>{item.description}</p>

          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItemQuantity(item._id, Number(e.target.value))
            }
          />

          <button onClick={() => removeFromCart(item)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: {getCartTotal()}</h3>
    </div>
  );
}