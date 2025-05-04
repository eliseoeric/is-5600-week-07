import React, { useContext } from 'react';
import PurchaseForm from './PurchaseForm';
import { CartContext} from '../state/CartProvider';


const Cart = () => {
  // TODO - get cart items from context
  const cartItems = [];
  const removeFromCart = () => {};
  const updateItemQuantity = () => {};
  const getCartTotal = () => {};
  const {cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useContext(CartContext); 
  // const cartItems = [];
  // const removeFromCart = () => { };
  // const updateItemQuantity = () => { };
  // const getCartTotal = () => { };

  return (
    <div className="center mw7 mv4">
@@ -28,14 +31,14 @@ const Cart = () => {
                <td className="tr pv2">
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item._id, -1)}
                    onClick={() => updateItemQuantity(item, -1)}
                  >
                    -
                  </a>
                  {item.quantity}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item._id, 1)}
                    onClick={() => updateItemQuantity(item, 1)}
                  >
                    +
                  </a>
@@ -54,7 +57,7 @@ const Cart = () => {
          </tbody>
        </table>
        <div className="tr f4 mv3">
          Total: ${getCartTotal().toFixed(2)}
          Total: ${getCartTotal()?.toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  );
};
export default Cart;