/// src/state/CartProvider.js
import React, { createContext, useContext, useReducer } from 'react';

// Initial cart state
const initialState = {
  cartItems: [], // Array to hold cart items
};

// Action Types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM:
      const existingItemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        // If item already exists in cart, update quantity
        const updatedItems = [...state.cartItems];
        updatedItems[existingItemIndex].quantity += 1;
        return { ...state, cartItems: updatedItems };
      } else {
        // Otherwise, add new item to cart
        return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
      }

    case REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    default:
      return state;
  }
};

// Create Cart Context
const CartContext = createContext();

// CartProvider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Dispatch function to add item to cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Dispatch function to remove item from cart
  const removeFromCart = (id) => {
    dispatch({ type: REMOVE_ITEM, payload: id });
  };

  // Dispatch function to update item quantity
  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  };

  // Cart total calculation
  const getCartTotal = () => {
    return state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

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
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
