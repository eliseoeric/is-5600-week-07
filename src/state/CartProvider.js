// src/state/CartProvider.js
import React, { createContext, useContext, useReducer } from "react";

export const CartContext = createContext(null);

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const item = action.payload;
      const existing = state.cartItems.find((p) => p.id === item.id);

      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((p) =>
            p.id === item.id ? { ...p, quantity: p.quantity + 1 } : p
          ),
        };
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          { ...item, quantity: 1 }
        ],
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter((p) => p.id !== action.payload),
      };

    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: Number(action.payload.quantity) }
            : item
        ),
      };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id, quantity } });

  const getCartTotal = () =>
    state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
