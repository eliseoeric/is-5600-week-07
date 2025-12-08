import React, { createContext, useContext, useMemo, useReducer } from "react";

const CartContext = createContext(null);

const ADD_ITEM = "ADD_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
const REMOVE_ITEM = "REMOVE_ITEM";
const CLEAR = "CLEAR";

function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const item = action.payload;
      const idx = state.findIndex((i) => i._id === item._id);
      if (idx >= 0) {
        const clone = [...state];
        clone[idx] = { ...clone[idx], quantity: clone[idx].quantity + 1 };
        return clone;
      }
      return [...state, { ...item, quantity: 1 }];
    }
    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      return state
        .map((i) => (i._id === id ? { ...i, quantity: Math.max(0, quantity) } : i))
        .filter((i) => i.quantity > 0);
    }
    case REMOVE_ITEM:
      return state.filter((i) => i._id !== action.payload);
    case CLEAR:
      return [];
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  const removeFromCart = (id) => dispatch({ type: REMOVE_ITEM, payload: id });
  const clearCart = () => dispatch({ type: CLEAR });

  const getCartTotal = () =>
    cartItems.reduce((sum, i) => {
      const price = i.likes || 0; // using "likes" as demo price per lab data
      return sum + price * i.quantity;
    }, 0);

  const value = useMemo(
    () => ({ cartItems, addToCart, updateItemQuantity, removeFromCart, clearCart, getCartTotal }),
    [cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
};
