import React, { useContext } from 'react'; // Import React and useContext to access CartContext
import PurchaseForm from './PurchaseForm'; // Import PurchaseForm component for completing the purchase
import { CartContext } from '../state/CartProvider'; // Import CartContext to access and manage cart items

/**
 * Cart Component:
 * This component displays the items added to the cart, allows users to update item quantities,
 * remove items from the cart, and view the total cart amount. It also renders the PurchaseForm
 * for the user to complete the purchase.
 */
const Cart = () => {
  // Access cart items, removeFromCart, updateItemQuantity, and getCartTotal from the CartContext
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useContext(CartContext);

  return (
    <div className="center mw7 mv4">
      {/* Cart table container */}
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2> {/* Cart title */}

        {/* Table to display cart items */}
        <table className="w-100 ba pa2">
          <thead>
            <tr>
              <th className="tl pv2">Product</th> {/* Column for product description */}
              <th className="tr pv2">Quantity</th> {/* Column for item quantity with update controls */}
              <th className="tr pv2">Price</th> {/* Column for the total price of the item */}
              <th className="tr pv2">Action</th> {/* Column for action buttons (Remove from cart) */}
            </tr>
          </thead>
          <tbody>
            {/* Map through cartItems and display each item in the table */}
            {cartItems && cartItems.map((item) => (
              <tr key={item._id}> {/* Unique key for each cart item */}
                <td className="tl pv2">{item.description}</td> {/* Display product description */}
                <td className="tr pv2">
                  {/* Decrease quantity button */}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 mr2"
                    onClick={() => updateItemQuantity(item, -1)}
                  >
                    -
                  </a>
                  {/* Display current quantity */}
                  {item.quantity}
                  {/* Increase quantity button */}
                  <a
                    className="pointer ba b--black-10 pv1 ph2 ml2"
                    onClick={() => updateItemQuantity(item, 1)}
                  >
                    +
                  </a>
                </td>
                {/* Display total price for the item (quantity * price) */}
                <td className="tr pv2">${item.price * item.quantity}</td>
                <td className="tr pv2">
                  {/* Remove item from the cart */}
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
        {/* Display total cart amount */}
        <div className="tr f4 mv3">
          Total: ${getCartTotal()?.toFixed(2)} {/* Calculate and display the total price of all cart items */}
        </div>
      </div>

      {/* Purchase form at the bottom for completing the order */}
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm /> {/* Render the PurchaseForm component */}
      </div>
    </div>
  );
};

export default Cart;