@@ -0,0 +1,18 @@

import React, { useContext } from 'react';
import { useCart } from "../state/CartProvider";

export default function OrderButton({product}) {

    // Import the addToCart function from the CartContext
    const { addToCart } = useCart();

    const handleClick = (product) => {
      console.log("Adding to cart", product)
      addToCart(product)
    }

    return (
      <a className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={() => handleClick(product)}>Add to Cart</a>
    )
  }