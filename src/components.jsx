import { useContext } from "react";
import { StoreContext } from "../context/StoreContext";

export default function Cart() {
  const { cart, submitOrder } = useContext(StoreContext);

  return (
    <div className="mb4">
      <h2>Your Cart</h2>

      {cart.length === 0 && <p>No items yet.</p>}

      {cart.map((item, index) => (
        <div key={index} className="ba b--gray pa2 mv2 br2">
          <p>{item.title}</p>
        </div>
      ))}

      {cart.length > 0 && (
        <button
          className="bg-green white pa2 br2 pointer mt3"
          onClick={submitOrder}
        >
          Submit Order
        </button>
      )}
    </div>
  );
}
