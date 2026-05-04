import React, {useContext} from 'react'
import { useCart } from '../state/CartProvider'
import { BASE_URL } from '../config';

export default function PurchaseForm({filter}) {
  const { cartItems  } = useCart();

  const [ buyerEmail, setBuyerEmail ] = React.useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    const products = cartItems.map((item) => item._id);

    const order = {
      buyerEmail,
      products,
      status: "PENDING",
    };
    
    // post cart to orders API
    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(order),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Order created:', data);
      })
      .catch((error) => {
        console.error('Error creating order:', error);
      });
    
  }

  return (
    <form className="pt4 pb4 pl2 black-80 w-50" onSubmit={handleSubmit}>
      <fieldset className="cf bn ma0 pa0">
        <div className="cf mb2">
          <input className="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-70-l br2-ns br--left-ns" placeholder='Email Address' value={buyerEmail} onChange={(e) => setBuyerEmail(e.target.value)} type="email" />
          <input className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-30-l br2-ns br--right-ns" type="submit" value="Purchase" />
        </div>
        <small id="name-desc" className="f6 black-60 db mb2">Enter your email address to complete purchase</small>
    </fieldset>
    </form>
  )
}
