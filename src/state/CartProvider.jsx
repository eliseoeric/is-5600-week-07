import React, { createContext, useContext, useReducer } from 'react';

export const CartContext = createContext();

const getItemId = (item) => item._id || item.id;

const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM': {
      const payloadId = getItemId(action.payload);
      const existingItem = state.find((item) => getItemId(item) === payloadId);
      if (existingItem) {
        return state.map((item) =>
          getItemId(item) === payloadId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...state, { ...action.payload, quantity: 1 }];
    }

    case 'UPDATE_ITEM_QUANTITY': {
      return state.map((item) =>
        getItemId(item) === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    }

    case 'REMOVE_ITEM': {
      return state.filter((item) => getItemId(item) !== action.payload.id);
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cartItems, dispatch] = useReducer(cartReducer, []);

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: 'UPDATE_ITEM_QUANTITY', payload: { id, quantity } });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { id } });
  };

  const getCartTotal = () => {
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, updateItemQuantity, removeFromCart, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);