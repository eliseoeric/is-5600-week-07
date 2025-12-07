import React, {
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";
const CartContext = createContext(undefined);
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (product, quantity = 1) => {
    if (!product) return;
    const id = product._id || product.id;
    if (!id) return;
    setItems((current) => {
      const existing = current.find((entry) => entry.id === id);
      if (existing) {
        return current.map((entry) =>
          entry.id === id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry
        );
      }

      return [...current, { id, product, quantity }];
    });
  };

  const removeItem = (id) => {
    setItems((current) => current.filter((entry) => entry.id !== id));
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce(
    (sum, entry) => sum + entry.quantity,
    0
  );

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

  return (
    <CartContext.Provider value={value}>{children}</CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside CartProvider");
  }
  return ctx;
}

export default CartContext;
