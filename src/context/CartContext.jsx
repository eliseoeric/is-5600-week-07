import React, { createContext, useContext, useState, useMemo } from "react";
const CartContext = createContext(null);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (product, quantity = 1) => {
    if (!product?._id && !product?.id) return;
    const id = product._id || product.id;
    setItems((current) => {
      const existing = current.find((item) => item.id === id);
      if (existing) {
        return current.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...current,
        {
          id,
          product,
          quantity,
        },
      ];
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((item) => item.id !== id));
  };
  const clearCart = () => setItems([]);
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const value = useMemo(
    () => ({
      items,
      addItem,
      removeItem,
      clearCart,
      totalItems,
    }),
    [items, totalItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}
export default CartContext;
