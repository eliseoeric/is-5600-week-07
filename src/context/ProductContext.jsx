import { createContext, useState, useEffect } from "react";

const ProductContext = createContext();
export { ProductContext };

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [error, setError] = useState("");

  const BASE = "https://congenial-giggle-pj975qpjwgpxfrpr9-4000.app.github.dev";

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    try {
      setError("");
      const res = await fetch(`${BASE}/products?page=1&limit=10`);
      const json = await res.json();
      setProducts(json.data || []);
    } catch (e) {
      setError("Could not load products.");
    }
  }

  function addToCart(product) {
    setCart(prev => [...prev, product]);
  }

  async function placeOrder() {
    const order = { items: cart };

    await fetch(`${BASE}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(order)
    });

    setCart([]);
  }

  return (
    <ProductContext.Provider value={{
      products,
      cart,
      error,
      addToCart,
      placeOrder,
    }}>
      {children}
    </ProductContext.Provider>
  );
}
