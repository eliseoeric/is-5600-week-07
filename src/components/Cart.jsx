import React from "react";
import { useCart } from "../state/CartProvider";
import PurchaseForm from "./PurchaseForm";

const ShoppingCart = () => {
  const { items, adjust, remove, total } = useCart();

  return (
    <div className="pa3">
      <h2 className="mb3">Shopping Cart</h2>
      {items.length === 0 ? <p>No items in cart.</p> : (
        <>
          <ul>
            {items.map(item => (
              <li key={item._id} className="mb2">
                {item.title} - ${item.price} × {item.quantity}
                <button onClick={() => adjust(item._id, -1)} className="ml2">-</button>
                <button onClick={() => adjust(item._id, 1)} className="ml1">+</button>
                <button onClick={() => remove(item._id)} className="ml2 red">Remove</button>
              </li>
            ))}
          </ul>
          <p className="mt3">Total: ${total()}</p>
          <PurchaseForm />
        </>
      )}
    </div>
  );
};

export default ShoppingCart;
