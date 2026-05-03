import React, { useMemo, useState } from 'react';
import { useStore } from '../state/StoreContext';

const ProductList = () => {
  const { products, loading, error, addToCart } = useStore();
  const [searchQuery, setSearchQuery] = useState('');
  const [offset, setOffset] = useState(0);
  const limit = 12;

  const filteredProducts = useMemo(() => {
    if (!searchQuery) return products;
    return products.filter((product) => {
      const title = (product.description || product.alt_description || '').toLowerCase();
      const author = (product.user?.username || '').toLowerCase();
      return title.includes(searchQuery.toLowerCase()) || author.includes(searchQuery.toLowerCase());
    });
  }, [products, searchQuery]);

  const paginatedProducts = filteredProducts.slice(offset, offset + limit);

  const handlePrevious = () => {
    setOffset(Math.max(0, offset - limit));
  };

  const handleNext = () => {
    setOffset(Math.min(filteredProducts.length - limit, offset + limit));
  };

  return (
    <div className="pa3">
      <div className="flex items-center justify-between mb3">
        <h2 className="f2">Products</h2>
        <input
          className="pa2 ba b--black-20 br2"
          placeholder="Search products"
          value={searchQuery}
          onChange={(event) => {
            setSearchQuery(event.target.value);
            setOffset(0);
          }}
        />
      </div>

      {loading.products && <p className="mv3">Loading products...</p>}
      {error && <p className="mv3 red">{error}</p>}

      {!loading.products && paginatedProducts.length === 0 && (
        <p className="mv3">No products found.</p>
      )}

      <div className="flex flex-wrap">
        {paginatedProducts.map((product) => (
          <div key={product._id} className="w-100 w-50-m w-33-l pa2">
            <div className="ba b--black-10 pa3 h-100 flex flex-column justify-between">
              <div>
                {product.urls?.small && (
                  <div
                    className="mb3 h4 cover bg-center"
                    style={{ backgroundImage: `url(${product.urls.small})` }}
                  />
                )}
                <h3 className="f5 mb2">{product.description || product.alt_description || 'Untitled'}</h3>
                <p className="gray mb3">by {product.user?.username || 'Unknown'}</p>
                <p className="mb3">${product.price?.toFixed(2) ?? '0.00'}</p>
              </div>
              <button
                className="pa3 bg-black white br2 pointer mt3 w-100"
                type="button"
                onClick={() => addToCart(product)}
              >
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt4">
        <button
          className="pa3 ba b--black-20 br2 pointer bg-white"
          type="button"
          disabled={offset === 0}
          onClick={handlePrevious}
        >
          Previous
        </button>
        <button
          className="pa3 ba b--black-20 br2 pointer bg-white"
          type="button"
          disabled={offset + limit >= filteredProducts.length}
          onClick={handleNext}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ProductList;
