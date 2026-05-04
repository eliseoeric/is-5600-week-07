import React from 'react'
import PurchaseForm from './PurchaseForm'
import { useCart } from '../state/CartProvider'

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useCart()

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
              <tr key={item._id}>
                <td className="tl pv2">{item.description ?? item.alt_description}</td>
                <td className="tr pv2">
                  <button onClick={() => updateItemQuantity(item._id, -1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateItemQuantity(item._id, 1)}>+</button>
                </td>
                <td className="tr pv2">{item.price * item.quantity}</td>
                <td className="tr pv2">
                  <button onClick={() => removeFromCart(item)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="tr f4 mv3">Total: {getCartTotal()}</div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  )
}

export default Cart