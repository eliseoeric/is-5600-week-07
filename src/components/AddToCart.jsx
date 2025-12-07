import React from 'react'
import { useCart } from '../state/CartProvider'

export default function AddToCart({ product }) {
    const { addToCart } = useCart()

    const handleClick = () => {
        addToCart(product)
    }

    return (
        <a
            className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black pointer"
            onClick={handleClick}
        >
            Add to Cart
        </a>
    )
}
