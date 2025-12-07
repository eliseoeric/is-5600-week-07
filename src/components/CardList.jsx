import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'
import { BASE_URL } from '../config'

const CardList = () => {
  const limit = 10

  const [allData, setAllData] = useState([])   // full list from API
  const [data, setData] = useState([])         // filtered list
  const [products, setProducts] = useState([]) // current page
  const [offset, setOffset] = useState(0)

  // Fetch products from the Node API once
  useEffect(() => {
    fetch(`${BASE_URL}/products?offset=0&limit=1000`)
      .then((res) => res.json())
      .then((json) => {
        setAllData(json)
        setData(json)
        setProducts(json.slice(0, limit))
      })
      .catch((err) => {
        console.error('Error fetching products:', err)
      })
  }, [])

  // Update page when offset or filtered data changes
  useEffect(() => {
    setProducts(data.slice(offset, offset + limit))
  }, [data, offset])

  // Filter by tag
  const filterTags = (tagQuery) => {
    const query = (tagQuery || '').trim().toLowerCase()

    if (!query) {
      setData(allData)
      setOffset(0)
      return
    }

    const filtered = allData.filter((product) => {
      if (!product.tags) return false
      return product.tags.some((t) =>
        (t.title || '').toLowerCase().includes(query)
      )
    })

    setData(filtered)
    setOffset(0)
  }

  // Single pagination handler
  const changePage = (direction) => {
    setOffset((prev) => {
      const next = prev + direction * limit
      const maxStart = Math.max(data.length - limit, 0)

      if (next < 0) return 0
      if (next > maxStart) return maxStart
      return next
    })
  }

  const canGoPrev = offset > 0
  const canGoNext = offset + limit < data.length

  return (
    <div className="cf pa2">
      <Search filter={filterTags} />

      <div className="mt2 mb2">
        {products &&
          products.map((product) => (
            <Card key={product._id || product.id} {...product} />
          ))}
      </div>

      <div className="flex items-center justify-center pa4">
        <Button
          text="Previous"
          handleClick={() => changePage(-1)}
          disabled={!canGoPrev}
        />
        <Button
          text="Next"
          handleClick={() => changePage(1)}
          disabled={!canGoNext}
        />
      </div>
    </div>
  )
}

export default CardList
