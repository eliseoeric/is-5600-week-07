import { createContext, useState, useEffect } from "react";

export const ProductContext = createContext();

export function ProductProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [orders, setOrders] = useState([]);

  // FETCH PRODUCTS FROM NODE API
  useEffect(() => {
    fetch("http://localhost:3001/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  // ADD ITEM TO CART
  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  // SEND CART TO NODE TO CREATE ORDER
  const createOrder = () => {
    fetch("http://localhost:3001/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: cart }),
    })
      .then((res) => res.json())
      .then((newOrder) => {
        setOrders([...orders, newOrder]);
        setCart([]); // clear cart
      })
      .catch((err) => console.error("Error creating order:", err));
  };

  return (
    <ProductContext.Provider
      value={{
        products,
        cart,
        orders,
        addToCart,
        createOrder,
        setOrders,
      }}
    >
      {children}
    </ProductContext.Provider>
  );
}
