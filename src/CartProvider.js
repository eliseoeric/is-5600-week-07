import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      // Existing logic to add item...
      return { ...state, cartItems: [...state.cartItems, action.payload] };

    // *********************************************************
    // TASK 1: ADD UPDATE_ITEM_QUANTITY CASE
    // *********************************************************
    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter((item) => item.id !== action.payload),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = (product) => {
    dispatch({ type: 'ADD_ITEM', payload: product });
  };

  // *********************************************************
  // TASK 1 (Cont.): IMPLEMENT THE UPDATE FUNCTION
  // *********************************************************
  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: { id, quantity },
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  // *********************************************************
  // TASK 2: IMPLEMENT CART TOTAL CALCULATION
  // *********************************************************
  const getCartTotal = () => {
    return state.cartItems.reduce((acc, item) => {
      return acc + (item.price * item.quantity);
    }, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);