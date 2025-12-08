import { createContext, useContext, useState, useMemo } from "react";
const CartContext = createContext();
export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const addItem = (p, qty = 1) =>
    setItems((prev) => {
      const id = p._id || p.id;
      const exist = prev.find((i) => i.id === id);
      return exist
        ? prev.map((i) =>
            i.id === id ? { ...i, quantity: i.quantity + qty } : i
          )
        : [...prev, { id, product: p, quantity: qty }];
    });
  const removeItem = (id) =>
    setItems((prev) => prev.filter((i) => i.id !== id));
  const clearCart = () => setItems([]);
  const totalItems = useMemo(
    () => items.reduce((s, i) => s + i.quantity, 0),
    [items]
  );
  return (
    <CartContext.Provider
      value={{ items, addItem, removeItem, clearCart, totalItems }}
    >
      {children}
    </CartContext.Provider>
  );
}
export const useCart = () => {
  const ctx = useContext(CCartContext);
  if (!ctx) throw new Error("useCart must be used inside CartProvider");
  return ctx;
};
