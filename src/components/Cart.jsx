import { useContext } from "react";
import { ProductContext } from "../context/ProductContext";

export default function Cart() {
  const { cart, placeOrder } = useContext(ProductContext);

  if (!cart.length) return <div>Your cart is empty.</div>;

  return (
    <div>
      {cart.map((item) => (
        <div key={item.id} style={{border:"1px solid #ddd", padding:"10px", margin:"8px 0"}}>
          <h4>{item.name}</h4>
          <p>${item.price}</p>
        </div>
      ))}

      <button onClick={placeOrder}>Place Order</button>
    </div>
  );
}
