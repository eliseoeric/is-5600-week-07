import React, { useContext } from 'react';
import { useCart } from '../state/CartProvider'; // ✅ Import the correct cart context

export default function OrderButton({ product }) {
  const { addToCart } = useCart(); // ✅ Use correct cart context

  const handleClick = () => {
    console.log("Adding to cart:", product); // ✅ Debugging Log
    addToCart(product);
  };

  return (
    <button className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={handleClick}>
      Add to Cart
    </button>
  );
}






















// export default function OrderButton({product}) {

//     const { addToCart } = useContext(CartContext);

//     const handleClick = (product) => {
//       console.log("Adding to cart", product)
//       addToCart(product)
//     }

//     return (
//       <a className="f6 link dim br3 ba bw1 ph3 pv2 mb2 dib black" onClick={() => handleClick(product)}>Add to Cart</a>
//     )
//   }