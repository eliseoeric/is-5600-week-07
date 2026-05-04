import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config'
import '../App.css'
import AddToCart from './AddToCart'

export default function SingleView() {
  // get id from URL
  const { id } = useParams()

  // state for product
  const [product, setProduct] = useState(null)

  // fetch product from API
  useEffect(() => {
    fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data)
      })
      .catch((err) => console.error("Error fetching product:", err))
  }, [id])

  // loading state
  if (!product) {
    return <div className="pa4">Loading...</div>
  }

  // fallback values (handles both APIs)
  const title = product.description || product.title
  const image = product.image || product.urls?.regular || "https://via.placeholder.com/400";

  return (
    <article className="bg-white center mw7 ba b--black-10 mv4">
      <div className="pv2 ph3">
        <h1 className="f4">{title}</h1>
      </div>

      <div className="aspect-ratio aspect-ratio--4x3">
        <img
          src={image}
          alt={title}
          className="aspect-ratio--object cover"
        />
      </div>

      <div className="pa3 flex justify-between">
        <div className="mw6">
          <h1 className="f6 ttu tracked">Product ID: {id}</h1>
        </div>
        <div className="gray db pv2">
          ❤️ <span>{product.likes || 0}</span>
        </div>
      </div>

      <div className="pa3 flex justify-end items-center">
        <span className="ma2 f4">
          ${product.price || 0}
        </span>

        {/*Add to Cart button */}
        <AddToCart product={product} />
      </div>
    </article>
  )
}