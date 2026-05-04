import React, { useState } from 'react'

const Search = ({ handleSearch }) => {
  const [query, setQuery] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    handleSearch(query)
  }

  const handleClear = () => {
    setQuery('')
    handleSearch('')
  }

  return (
    <form className="pa4 black-80" onSubmit={handleSubmit}>
      <fieldset className="cf bn ma0 pa0">
        <div className="cf mb2">
          <input
            className="f6 f5-l input-reset fl black-80 bg-white pa3 lh-solid w-100 w-75-m w-80-l br2-ns br--left-ns"
            placeholder="Search by tag"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            type="text"
          />
          <input
            className="f6 f5-l button-reset fl pv3 tc bn bg-animate bg-black-70 hover-bg-black white pointer w-100 w-25-m w-20-l br2-ns br--right-ns"
            type="submit"
            value="Search"
          />
        </div>
        <small className="f6 black-60 db mb2">Search by tag e.g. "woman"</small>
      </fieldset>
    </form>
  )
}

export default Search