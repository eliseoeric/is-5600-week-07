import React, { useReducer, useContext } from 'react'
import React, { createContext, useReducer, useContext } from 'react';

// Initialize the context
const CartContext = React.createContext()
// Create Cart Context
const CartContext = createContext();

// Definte the default state
const initialState = {
  itemsById: {},
  allItems: [],
}

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

// Define the reducer
// Cart reducer to handle state changes
const cartReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
      const newState = {
    case 'ADD_ITEM': {
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (existingItem) {
        // If item exists, increase its quantity
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }
      // If item doesn't exist, add it with quantity of 1
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
    }

    case 'UPDATE_ITEM_QUANTITY': {
      const { id, quantity } = action.payload;
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload,
            quantity: state.itemsById[payload._id]
              ? state.itemsById[payload._id].quantity + 1
              : 1,
          },
        },
        // Use `Set` to remove all duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
        cartItems: state.cartItems.map(item =>
          item._id === id ? { ...item, quantity } : item
        ),
      };
      return newState
    case REMOVE_ITEM:
      const updatedState = {
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
        ),
      }
      return updatedState

        cartItems: state.cartItems.filter(item => item._id !== action.payload._id),
      };

    default:
      return state
      return state;
  }
}
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  // Add an item to the cart
  // Function to add item to cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
  }
  // Function to update item quantity
  const updateItemQuantity = (id, quantity) => {
    // Ensure quantity is not zero or negative
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
    }
  };

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }
  // Function to remove item from cart
  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }
  // Function to calculate the total price of all items in the cart
  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, updateItemQuantity, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)
  );
};

export { CartProvider, useCart }
// Custom hook to use cart context
export const useCart = () => useContext(CartContext);
