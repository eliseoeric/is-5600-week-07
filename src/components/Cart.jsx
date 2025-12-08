import React from 'react';
import { useCart } from '../state/CartProvider';

export default function Cart() {
  const { cartItems, updateItemQuantity, removeFromCart, getCartTotal } = useCart();

  return (
    <div className="pa4">
      <h2>Your Cart</h2>

      <table className="w-100 collapse">
        <thead>
          <tr>
            <th className="tl pv2">Product</th>
            <th className="tl pv2">Price</th>
            <th className="tl pv2">Qty</th>
            <th className="tl pv2">Subtotal</th>
            <th className="tl pv2">Actions</th>
          </tr>
        </thead>

        <tbody>
          {cartItems.map((item) => {
            const price = item.price ?? 5; // default price for images
            return (
              <tr key={item.id}>
                <td className="pv3">{item.description || item.alt_description}</td>

                <td className="pv3">${price.toFixed(2)}</td>

                <td className="pv3">
                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity - 1)}
                    className="mh2"
                  >
                    -
                  </button>

                  {item.quantity}

                  <button
                    onClick={() => updateItemQuantity(item.id, item.quantity + 1)}
                    className="mh2"
                  >
                    +
                  </button>
                </td>

                <td className="pv3">
                  ${(price * item.quantity).toFixed(2)}
                </td>

                <td className="pv3">
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      <h3 className="tr pa3">
        Total: ${getCartTotal().toFixed(2)}
      </h3>
    </div>
  );
}
