import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function Cart() {
  const { cart, createOrder } = useContext(ProductContext);

  return (
    <div>
      <h2>Cart</h2>

      {cart.length === 0 && <p>No items in cart</p>}

      {cart.map((item, index) => (
        <p key={index}>
          {item.name} - ${item.price}
        </p>
      ))}

      {cart.length > 0 && (
        <button onClick={createOrder}>Place Order</button>
      )}
    </div>
  );
}
