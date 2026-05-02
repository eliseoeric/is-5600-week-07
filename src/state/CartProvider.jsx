import React, { createContext, useReducer, useContext } from 'react';

// Create Context
export const CartContext = createContext();

// Initial state
const initialState = {
  cartItems: []
};

// Reducer function
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItem = state.cartItems.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }]
        };
      }
    }
    
    case 'UPDATE_ITEM_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity becomes 0 or negative
        return {
          ...state,
          cartItems: state.cartItems.filter(item => item.id !== id)
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item.id === id ? { ...item, quantity: quantity } : item
        )
      };
    }
    
    case 'REMOVE_ITEM': {
      return {
        ...state,
        cartItems: state.cartItems.filter(item => item.id !== action.payload)
      };
    }
    
    case 'CLEAR_CART': {
      return {
        ...state,
        cartItems: []
      };
    }
    
    default:
      return state;
  }
};

// Provider component
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Action functions
  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.cartItems.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartCount = () => {
    return state.cartItems.reduce((count, item) => {
      return count + item.quantity;
    }, 0);
  };

  const value = {
    cartItems: state.cartItems,
    addToCart,
    updateItemQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartCount
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook for using cart
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};