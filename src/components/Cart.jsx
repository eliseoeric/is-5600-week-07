
import React from 'react';
import { useCart } from '../state/CartProvider';
import { Link } from 'react-router-dom';
import PurchaseForm from './PurchaseForm';

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart();

  return (
    <div className="center mw7 mv4">
      <div className="bg-blue-lightest pa4 br3 shadow-2">
        <h2 className="f2 mb3" style={{ color: '#60a5fa' }}>Cart</h2>

        <table 
          className="w-100 ba b--blue-lightest"
          style={{ borderColor: '#bfdbfe', tableLayout: 'auto' }}
        >
          <thead className="bg-blue-lighter" style={{ backgroundColor: '#e0f2fe' }}>
            <tr>
              <th className="tl pv2 ph2">Product</th>
              <th className="tr pv2 ph2">Quantity</th>
              <th className="tr pv2 ph2">Price</th>
              <th className="tr pv2 ph2">Action</th>
            </tr>
          </thead>

          <tbody>
            {cartItems && cartItems.length > 0 ? (
              cartItems.map((item) => {
                const itemId = item._id || item.id;
                const quantity = item.quantity || 0;
                const price = item.price || 0;

                return (
                  <tr 
                    key={itemId}
                    className="hover-bg-blue-lightest"
                    style={{ 
                      transition: 'background 0.2s',
                      verticalAlign: 'middle'
                    }}
                  >
                    
                    <td 
                      className="tl pv2 ph2"
                      style={{
                        whiteSpace: 'normal',
                        wordBreak: 'break-word'
                      }}
                    >
                      <Link
                        to={`/product/${itemId}`}
                        className="blue-dark hover-blue underline"
                      >
                        {item.title || item.description || 'Unnamed Product'}
                      </Link>
                    </td>

                    
                    <td className="tr pv2 ph2">
                      <span
                        className="pointer ba b--blue-lightest pv1 ph2 mr2"
                        onClick={() => updateItemQuantity(itemId, quantity - 1)}
                      >
                        -
                      </span>

                      {quantity}

                      <span
                        className="pointer ba b--blue-lightest pv1 ph2 ml2"
                        onClick={() => updateItemQuantity(itemId, quantity + 1)}
                      >
                        +
                      </span>
                    </td>

                    
                    <td className="tr pv2 ph2">
                      ${(price * quantity).toFixed(2)}
                    </td>

                    
                    <td className="tr pv2 ph2">
                      <span
                        className="pointer ba b--blue-lightest pv1 ph2 bg-red-lightest hover-bg-red"
                        onClick={() => removeFromCart(item)}
                      >
                        Remove
                      </span>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="4" className="pa3 tc" style={{ color: '#60a5fa' }}>
                  Your cart is empty.
                </td>
              </tr>
            )}
          </tbody>
        </table>

        
        <div className="tr f4 mv3" style={{ color: '#3b82f6' }}>
          Total: ${(getCartTotal() || 0).toFixed(2)}
        </div>
      </div>

      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};

export default Cart;
