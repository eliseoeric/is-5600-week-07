import React from 'react'
import { useStore } from '../state/StoreProvider'
import PurchaseForm from './PurchaseForm'

const Cart = () => {
  const { cartItems, removeFromCart, updateItemQuantity, getCartTotal } = useStore()

  return (
    <div className="center mw7 mv4">
      <div className="bg-white pa3 mb3">
        <h2 className="f2 mb2">Cart</h2>
        {cartItems.length === 0 ? (
          <div className="pa3">Your cart is empty. Add a product to begin.</div>
        ) : (
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
                  <td className="tl pv2">{item.description || item.alt_description || 'Untitled product'}</td>
                  <td className="tr pv2">
                    <button
                      type="button"
                      className="pointer ba b--black-10 pv1 ph2 mr2 bg-white"
                      onClick={() => updateItemQuantity(item._id, -1)}
                    >
                      -
                    </button>
                    {item.quantity}
                    <button
                      type="button"
                      className="pointer ba b--black-10 pv1 ph2 ml2 bg-white"
                      onClick={() => updateItemQuantity(item._id, 1)}
                    >
                      +
                    </button>
                  </td>
                  <td className="tr pv2">${((Number(item.price) || 0) * item.quantity).toFixed(2)}</td>
                  <td className="tr pv2">
                    <button
                      type="button"
                      className="pointer ba b--black-10 pv1 ph2 bg-white"
                      onClick={() => removeFromCart(item._id)}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        <div className="tr f4 mv3">
          Total: ${getCartTotal().toFixed(2)}
        </div>
      </div>
      <div className="flex justify-end pa3 mb3">
        <PurchaseForm />
      </div>
    </div>
  )
}

export default Cart;
