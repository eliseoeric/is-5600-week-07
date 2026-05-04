import React from 'react'
import { useCart } from '../state/CartProvider'

export default function AddToCart({ product }) {
  const { addToCart } = useCart()
  const handleClick = () => addToCart(product)
  return (
    <button onClick={handleClick}>
      Add to Cart
    </button>
  )
}