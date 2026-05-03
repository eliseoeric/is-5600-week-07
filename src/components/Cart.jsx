import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';
// 1. Import the useCart hook (or CartContext)
import { CartContext } from '../state/CartProvider';

const Cart = () => {
  // 2. Extract state and actions from Context
  const { 
    cartItems, 
    removeFromCart, 
    updateItemQuantity, 
    getCartTotal 
  } = useContext(CartContext);

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
            {cartItems && cartItems.map((item) => (
              <tr key={item._id || item.id}>
                <td className="tl pv2">{item.description || item.alt_description}</td>
                <td className="tr pv2">
                  <button
                    className="pointer ba b--black-10 pv1 ph2 mr2 bg-white"
                    // 3. Logic for decreasing: item.quantity - 1
                    onClick={() => updateItemQuantity(item._id, item.quantity - 1)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="pointer ba b--black-10 pv1 ph2 ml2 bg-white"
                    // 4. Logic for increasing: item.quantity + 1
                    onClick={() => updateItemQuantity(item._id, item.quantity + 1)}
                  >
                    +
                  </button>
                </td>
                <td className="tr pv2">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2"
                    // 5. Pass the item to remove
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
          {/* 6. Call getCartTotal() to display the final price */}
          Total: ${getCartTotal().toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;