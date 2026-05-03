import React from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../state/CartProvider'

const Header = () => {
  const { cartItems } = useCart()

  const totalItems = cartItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  )

  return (
    <nav className="pa3 bg-light-blue">
      <Link to="/" className="mr3">
        Home
      </Link>

      <Link to="/cart" className="mr3">
        Cart ({totalItems})
      </Link>

      <Link to="/orders">
        Orders
      </Link>
    </nav>
  )
}

export default Header
