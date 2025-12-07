import React from "react";
import PurchaseForm from "./PurchaseForm";
import { useCart } from "../state/CartProvider";

const Cart = () => {
  // Get cart functions from context
  const { getCartItems, removeFromCart, updateItemQuantity, getCartTotal } =
    useCart();

  // Get actual items array
  const cartItems = getCartItems();

  return (
    <div className="center mw7 mv4">
      <h1 className="f3">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <table className="w-100 collapse">
            <thead>
              <tr>
                <th className="tl pb2">Product</th>
                <th className="tc pb2">Qty</th>
                <th className="tr pb2">Price</th>
                <th></th>
              </tr>
            </thead>

            <tbody>
              {cartItems.map((item) => (
                <tr key={item._id} className="stripe-dark">
                  <td className="pv3">{item.description || "No Title"}</td>

                  {/* Quantity controls */}
                  <td className="tc pv3">
                    <a
                      className="pointer ba b--black-10 pv1 ph2 mr2"
                      onClick={() =>
                        updateItemQuantity(
                          item._id,
                          Math.max(1, item.quantity - 1)
                        )
                      }
                    >
                      -
                    </a>

                    {item.quantity}

                    <a
                      className="pointer ba b--black-10 pv1 ph2 ml2"
                      onClick={() =>
                        updateItemQuantity(item._id, item.quantity + 1)
                      }
                    >
                      +
                    </a>
                  </td>

                  {/* Price */}
                  <td className="tr pv3">${item.price * item.quantity}</td>

                  {/* Remove */}
                  <td className="tr pv3">
                    <button
                      className="ba b--red ph2 pv1 red bg-white pointer"
                      onClick={() => removeFromCart(item._id)}
                    >
                      remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Cart Total */}
          <div className="tr mt3 f4">
            <strong>Total: ${getCartTotal()}</strong>
          </div>

          <div className="mt4">
            <PurchaseForm />
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
