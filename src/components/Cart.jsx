import React from 'react';
import PurchaseForm from './PurchaseForm';
import { useCart } from '../state/CartProvider';

const Cart = () => {
  // Get cart functions from context
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <table className="w-100 collapse">
        <thead>
          <tr>
            <th className="tl pv2">Product</th>
            <th className="tl pv2">Description</th>
            <th className="tr pv2">Quantity</th>
            <th className="tr pv2">Price</th>
            <th className="tr pv2">Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems && cartItems.map((item) => (
            <tr key={item.id}>
              <td className="tl pv2">{item.name}</td>
              <td className="tl pv2">{item.description ?? item.alt_description}</td>
              <td className="tr pv2">
                <a
                  className="pointer ba b--black-10 pv1 ph2 mr2"
                  onClick={() => updateItemQuantity(item.id, -1)}
                >
                  -
                </a>
                {item.quantity}
                <a
                  className="pointer ba b--black-10 pv1 ph2 ml2"
                  onClick={() => updateItemQuantity(item.id, 1)}
                >
                  +
                </a>
              </td>
              <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
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
        Total: ${getCartTotal().toFixed(2)}
      </div>

      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
