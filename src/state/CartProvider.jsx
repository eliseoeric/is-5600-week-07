// src/state/CartProvider.jsx
import React, { useReducer, useContext, createContext } from "react";

// Initialize Context
const CartContext = createContext();

// Define Default State
const initialState = {
  items: [],
};

// Define Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      if (existingItemIndex > -1) {
        // If item exists, increase quantity
        const updatedItems = state.items.map((item, index) => 
          index === existingItemIndex ? { ...item, quantity: item.quantity + 1 } : item
        );
        return { ...state, items: updatedItems };
      }
      // If new item, add with quantity 1
      return { ...state, items: [...state.items, { ...action.payload, quantity: 1 }] };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload.id)
      };

    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        items: state.items.map(item => 
          item.id === action.payload.id 
            ? { ...item, quantity: action.payload.quantity } 
            : item
        )
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
};

// Provider Component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Action Creators
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    if (quantity < 1) {
      dispatch({ type: 'REMOVE_ITEM', payload: { id } });
    } else {
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
    }
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      updateItemQuantity,
      getCartTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
