import React, { useState, useEffect } from 'react'
import Card from './Card'
import Button from './Button'
import Search from './Search'

const CardList = ({ data }) => {
  const limit = 10
  const [offset, setOffset] = useState(0)
  const [products, setProducts] = useState(data)

  useEffect(() => {
    setProducts(data.slice(offset, offset + limit))
  }, [offset, data])

  const filterTags = (tagQuery) => {
    const filtered = data.filter((product) => {
      if (!tagQuery) return product

      return product.tags?.some((tag) =>
        tag.title.toLowerCase().includes(tagQuery.toLowerCase())
      )
    })

    setProducts(filtered)
  }

  return (
    <>
      <Search filterTags={filterTags} />

      <div className="flex flex-wrap justify-center">
        {products.map((item) => (
          <Card
  key={item._id || item.id}
  id={item.id}
  _id={item._id}
  description={item.description}
  alt_description={item.alt_description}
  urls={item.urls}
  user={item.user}
  likes={item.likes}
/>
        ))}
      </div>

      <div className="tc pa3">
        <Button
          text="Previous"
          clickHandler={() =>
            setOffset(offset - limit < 0 ? 0 : offset - limit)
          }
        />

        <Button
          text="Next"
          clickHandler={() =>
            setOffset(offset + limit >= data.length ? offset : offset + limit)
          }
        />
      </div>
    </>
  )
}

export default CardList