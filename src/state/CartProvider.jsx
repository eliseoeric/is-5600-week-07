import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

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
const cartReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
      const newState = {
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
      };
      return newState
    case REMOVE_ITEM:
      const updatedState = {
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
    
    default:
      return state
  }
}

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }

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
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
// src/state/CartProvider.jsx
import React, { createContext, useReducer, useContext, useMemo } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [], // { id, title, price, quantity, ... }
};

const ACTIONS = {
  ADD_ITEM: "ADD_ITEM",
  REMOVE_ITEM: "REMOVE_ITEM",
  UPDATE_ITEM_QUANTITY: "UPDATE_ITEM_QUANTITY",
  CLEAR_CART: "CLEAR_CART",
};

function cartReducer(state, action) {
  switch (action.type) {
    case ACTIONS.ADD_ITEM: {
      const item = action.payload;
      const existing = state.cartItems.find((i) => i.id === item.id);
      if (existing) {
        // increase quantity by payload.quantity (default 1)
        return {
          ...state,
          cartItems: state.cartItems.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + (item.quantity || 1) } : i
          ),
        };
      }
      return {
        ...state,
        cartItems: [...state.cartItems, { ...item, quantity: item.quantity || 1 }],
      };
    }

    case ACTIONS.REMOVE_ITEM:
      return { ...state, cartItems: state.cartItems.filter((i) => i.id !== action.payload) };

    case ACTIONS.UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = action.payload;
      // set the quantity (replace, not add)
      if (quantity <= 0) {
        // remove if 0 or less
        return { ...state, cartItems: state.cartItems.filter((i) => i.id !== id) };
      }
      return {
        ...state,
        cartItems: state.cartItems.map((i) => (i.id === id ? { ...i, quantity } : i)),
      };
    }

    case ACTIONS.CLEAR_CART:
      return { ...state, cartItems: [] };

    default:
      return state;
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // actions
  const addToCart = (product) => dispatch({ type: ACTIONS.ADD_ITEM, payload: product });
  const removeFromCart = (id) => dispatch({ type: ACTIONS.REMOVE_ITEM, payload: id });
  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: ACTIONS.UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  const clearCart = () => dispatch({ type: ACTIONS.CLEAR_CART });

  // get total
  const getCartTotal = () => {
    return state.cartItems.reduce((acc, item) => acc + Number(item.price) * Number(item.quantity), 0);
  };

  // memoize context value
  const value = useMemo(
    () => ({
      cartItems: state.cartItems,
      addToCart,
      removeFromCart,
      updateItemQuantity,
      clearCart,
      getCartTotal,
    }),
    [state.cartItems]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

// convenience hook
export const useCart = () => {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
};
