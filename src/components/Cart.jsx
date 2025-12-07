import { useCart } from "../state/CartProvider";

const Cart = () => {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal,
  } = useCart();

  return (
    <div>
      <h2>Your Cart</h2>

      {cartItems.map((item) => (
        <div key={item.id}>
          <p>{item.name}</p>
          <input
            type="number"
            value={item.quantity}
            onChange={(e) =>
              updateItemQuantity(item.id, Number(e.target.value))
            }
          />
          <button onClick={() => removeFromCart(item.id)}>
            Remove
          </button>
        </div>
      ))}

      <h3>Total: ${getCartTotal()}</h3>
    </div>
  );
};

export default Cart;

