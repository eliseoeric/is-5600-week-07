import React from 'react'
import { useCart } from '../state/CartProvider'

export default function Cart() {
  const {
    cartItems,
    updateItemQuantity,
    removeFromCart,
    getCartTotal
  } = useCart()

  return (
    <div className="pa4">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 && (
        <p>Your cart is empty.</p>
      )}

      {cartItems.map((item) => (
        <div key={item.id} className="ba pa3 mv3">
          <h3>{item.name}</h3>

          <p>Price: ${item.price}</p>

          <p>Quantity: {item.quantity}</p>

          <input
            type="number"
            min="1"
            value={item.quantity}
            onChange={(e) =>
              updateItemQuantity(
                item.id,
                Number(e.target.value)
              )
            }
          />

          <button
            className="ml3"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </button>
        </div>
      ))}

      <h2>Total: ${getCartTotal()}</h2>
    </div>
  )
}

