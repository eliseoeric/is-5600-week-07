// src/components/Search.js
import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products"
      />
      <button onClick={() => onSearch(query)}>
        <img src="https://media.istockphoto.com/id/1127564236/vector/phone-receiver-handle-with-cord-cartoon.jpg?s=612x612&w=0&k=20&c=LvD8SROu8MM7Bjwm-45-fiyXVUSHQnWuwkv83mrCWWc=" alt="Search" width="20" height="20" />
        Search
      </button>
    </div>
  );
};

export default Search;
