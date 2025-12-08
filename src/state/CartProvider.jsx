// src/state/CartProvider.jsx
import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = { cartItems: [] };

const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";
const CLEAR_CART = "CLEAR_CART";

function cartReducer(state, action) {
  switch (action.type) {
    case ADD_ITEM: {
      const product = action.payload;
      const existing = state.cartItems.find((i) => i._id === product._id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i._id === product._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...product, quantity: 1 }],
      };
    }
    case REMOVE_ITEM: {
      const id = action.payload._id || action.payload.id;
      return {
        ...state,
        cartItems: state.cartItems.filter((i) => i._id !== id),
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        return {
          ...state,
          cartItems: state.cartItems.filter((i) => i._id !== id),
        };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((i) =>
          i._id === id ? { ...i, quantity } : i
        ),
      };
    }
    case CLEAR_CART:
      return initialState;
    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const removeFromCart = (product) =>
    dispatch({ type: REMOVE_ITEM, payload: product });
  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  const clearCart = () => dispatch({ type: CLEAR_CART });

  const getCartTotal = () =>
    state.cartItems.reduce((acc, it) => acc + Number(it.price || 0) * Number(it.quantity || 0), 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
