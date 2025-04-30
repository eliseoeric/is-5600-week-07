import React, { createContext, useReducer, useContext } from 'react';

// Create Cart Context
const CartContext = createContext();

// Cart reducer to handle state changes
const cartReducer = (state, action) => {
  switch (action.type) {
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
        cartItems: state.cartItems.map(item =>
          item._id === id ? { ...item, quantity } : item
        ),
      };
    }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item._id !== action.payload._id),
      };

    default:
      return state;
  }
};

// Cart Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  // Function to add item to cart
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // Function to update item quantity
  const updateItemQuantity = (id, quantity) => {
    // Ensure quantity is not zero or negative
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
    }
  };

  // Function to remove item from cart
  const removeFromCart = (product) => {
    dispatch({ type: 'REMOVE_ITEM', payload: product });
  };

  // Function to calculate the total price of all items in the cart
  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, updateItemQuantity, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => useContext(CartContext);