import React from "react";
import { useCart } from "../state/CartProvider";
import PurchaseForm from "./PurchaseForm";

const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateItemQuantity,
    getCartTotal,
  } = useCart();

  const handleDecrease = (item) => {
    const newQty = Math.max(1, (item.quantity || 1) - 1);
    updateItemQuantity(item._id, newQty);
  };

  const handleIncrease = (item) => {
    const newQty = (item.quantity || 0) + 1;
    updateItemQuantity(item._id, newQty);
  };

  const total = getCartTotal();

  if (!cartItems || cartItems.length === 0) {
    return (
      <div className="center mw7 mv4">
        <div className="bg-white pa3 mb3">
          <h2 className="f2 mb2">Cart</h2>
          <p>Your cart is empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
        <table className="w-100 ba pa2">
          <thead>
            <tr>
              <th className="tl pv2">Product</th>
              <th className="tr pv2">Quantity</th>
              <th className="tr pv2">Price</th>
              <th className="tr pv2">Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item._id}>
                <td className="tl pv2">
                  {item.description || item.alt_description}
                </td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => handleDecrease(item)}
                  >
                    -
                  </a>
                  {item.quantity}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => handleIncrease(item)}
                  >
                    +
                  </a>
                </td>
                <td className="tr pv2">
                  ${((item.price || 0) * (item.quantity || 0)).toFixed(2)}
                </td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2"
                    onClick={() => removeFromCart(item)}
                  >
                    Remove
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tr f4 mv3">
          Total: ${total.toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
