import React, { useMemo, useState } from 'react'
import { useStore } from '../state/StoreProvider'
import Card from './Card'
import Search from './Search'
import Button from './Button'

const ProductList = () => {
  const { products, loading, error, addToCart } = useStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [offset, setOffset] = useState(0)
  const limit = 12

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products
    return products.filter((product) => {
      const title = product.description || product.alt_description || ''
      const tags = product.tags ? product.tags.map((tag) => tag.title || tag).join(' ') : ''
      return `${title} ${tags}`.toLowerCase().includes(searchQuery.toLowerCase())
    })
  }, [products, searchQuery])

  const pagedProducts = filteredProducts.slice(offset, offset + limit)

  const handleSearch = (term) => {
    setSearchQuery(term)
    setOffset(0)
  }

  return (
    <div className="pa3">
      <div className="mb3">
        <Search handleSearch={handleSearch} />
      </div>

      {loading.products && (
        <div className="pa3 bg-light-yellow black">Loading products...</div>
      )}
      {error.products && (
        <div className="pa3 bg-washed-red black">{error.products}</div>
      )}

      <div className="cf">
        {pagedProducts.length === 0 && !loading.products ? (
          <div className="pa3">No products found.</div>
        ) : (
          pagedProducts.map((product) => (
            <div key={product._id || product.id} className="fl w-50 w-25-m w-20-l pa2">
              <Card {...product} />
              <div className="tc mt2">
                <button
                  className="f6 link dim br-pill ph3 pv2 mb2 dib white bg-black hover-bg-gray"
                  onClick={() => addToCart(product)}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => setOffset(Math.max(offset - limit, 0))}
          disabled={offset === 0}
        />
        <Button
          text="Next"
          handleClick={() => setOffset(offset + limit)}
          disabled={offset + limit >= filteredProducts.length}
        />
      </div>
    </div>
  )
}

export default ProductList
