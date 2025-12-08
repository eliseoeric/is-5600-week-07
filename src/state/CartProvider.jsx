// src/state/CartProvider.jsx
import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
        };
      }
    
    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload),
      };
    
    // YOUR TASK 1: Implement UPDATE_ITEM_QUANTITY
    case 'UPDATE_ITEM_QUANTITY':
      const { id, quantity } = action.payload;
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === id
            ? { ...item, quantity: Math.max(0, quantity) } // Directly set the new quantity
            : item
        ).filter(item => item.quantity > 0), // Remove items with quantity 0
      };
    
    case 'CLEAR_CART':
      return { ...state, cartItems: [] };
    
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // YOUR TASK 1: Implement updateItemQuantity function
  const updateItemQuantity = (id, quantity) => {
    dispatch({ 
      type: 'UPDATE_ITEM_QUANTITY', 
      payload: { id, quantity } 
    });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  // YOUR TASK 2: Implement getCartTotal function
  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity, // Make sure to include this
        clearCart,
        getCartTotal, // And this
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};