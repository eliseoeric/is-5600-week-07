import React, { useState } from 'react'
import { useStore } from '../state/StoreProvider'

export default function PurchaseForm() {
  const { cartItems, createOrder, loading, error } = useStore()
  const [buyerEmail, setBuyerEmail] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [submitError, setSubmitError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitError(null)
    setSuccessMessage(null)

    try {
      await createOrder({ buyerEmail })
      setSuccessMessage('Order submitted successfully!')
      setBuyerEmail('')
    } catch (err) {
      setSubmitError(err.message || 'Unable to submit order.')
    }
  }

  const disabled = cartItems.length === 0 || loading.submit

  return (
    <form className="pt4 pb4 pl2 black-80 w-100" onSubmit={handleSubmit}>
      {error.submit && <div className="mb3 pa3 bg-washed-red dark-red">{error.submit}</div>}
      {submitError && <div className="mb3 pa3 bg-washed-red dark-red">{submitError}</div>}
      {successMessage && <div className="mb3 pa3 bg-washed-green dark-green">{successMessage}</div>}
      <fieldset className="cf bn ma0 pa0">
        <div className="cf mb2">
          <input
            className="f6 f5-l input-reset fl black-80 ba b--black-20 bg-white pa3 lh-solid w-100 w-70-l br2-ns br--left-ns"
            placeholder="Email Address"
            value={buyerEmail}
            onChange={(e) => setBuyerEmail(e.target.value)}
            type="email"
            required
          />
          <button
            className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-30-l br2-ns br--right-ns"
            type="submit"
            disabled={disabled}
          >
            {loading.submit ? 'Submitting...' : 'Purchase'}
          </button>
        </div>
        <small className="f6 black-60 db mb2">
          {cartItems.length === 0
            ? 'Your cart is empty and cannot be submitted.'
            : 'Enter your email address to complete purchase.'}
        </small>
      </fieldset>
    </form>
  )
}
