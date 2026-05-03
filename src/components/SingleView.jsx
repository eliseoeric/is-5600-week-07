import React from 'react'
import { useParams } from 'react-router-dom'
import { useStore } from '../state/StoreProvider'
import '../App.css'

export default function SingleView() {
  const { id } = useParams()
  const { products, addToCart } = useStore()
  const product = products.find((item) => item._id === id || item.id === id)

  if (!product) {
    return (
      <div className="center mw7 mv4 pa3 bg-washed-yellow black">
        Product not found.
      </div>
    )
  }

  const { user } = product
  const title = product.description ?? product.alt_description ?? 'Product'
  const style = {
    backgroundImage: `url(${product.urls?.regular || product.urls?.small || ''})`,
  }

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <div className="flex items-center">
          <img
            src={user?.profile_image?.medium}
            className="br-100 h3 w3 dib"
            alt={user?.instagram_username || 'Artist'}
          />
          <h1 className="ml3 f4">{user?.first_name} {user?.last_name}</h1>
        </div>
      </div>
      <div className="aspect-ratio aspect-ratio--4x3">
        <div className="aspect-ratio--object cover" style={style}></div>
      </div>
      <div className="pa3 flex justify-between items-center">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
          <p className="lh-copy">{title}</p>
        </div>
        <div className="gray db pv2">&hearts;<span>{product.likes}</span></div>
      </div>
      <div className="pa3 flex items-center justify-between">
        <span className="ma2 f4">${(Number(product.price) || 9.99).toFixed(2)}</span>
        <button
          type="button"
          className="f6 br-pill ph3 pv2 bn bg-black white dim pointer"
          onClick={() => addToCart(product)}
        >
          Add to Cart
        </button>
      </div>
    </article>
  )
}
