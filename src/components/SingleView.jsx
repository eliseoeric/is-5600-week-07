import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../config'
import AddToCart from './AddToCart'

export default function SingleView() {
  const { id } = useParams()

  const [product, setProduct] = useState(null)

  const fetchProductById = async (id) => {
    const product = await fetch(`${BASE_URL}/products/${id}`)
      .then((res) => res.json())

    return product
  }

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchProductById(id)
      setProduct(data)
    }

    getProduct()
  }, [id])

  if (!product) {
    return <div>Loading...</div>
  }

  return (
    <div className="pa4">
      <img
        src={product.image}
        alt={product.name}
        width="300"
      />

      <h1>{product.name}</h1>

      <p>{product.description}</p>

      <h2>${product.price}</h2>

      <AddToCart product={product} />
    </div>
  )
}

