// src/state/CartProvider.jsx
import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: []
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.cartItems.find(item => item.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
      };
    }

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };

    case "UPDATE_ITEM_QUANTITY": {
      const { id, quantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity } : item
        )
      };
    }

    default:
      return state;
  }
}

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = (id) => dispatch({ type: "REMOVE_ITEM", payload: id });
  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id, quantity } });

  const getCartTotal = () =>
    state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
