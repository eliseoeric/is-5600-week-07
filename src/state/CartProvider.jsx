@@ -1,7 +1,10 @@
import React, { useReducer, useContext } from 'react'
// src/state/CartProvider.jsx
import React, { createContext, useState } from "react";

// Initialize the context
const CartContext = React.createContext()
export const CartContext = createContext();

// Definte the default state
const initialState = {
@@ -49,7 +52,7 @@ const cartReducer = (state, action) => {
        ),
      }
      return updatedState
    

    default:
      return state
  }
@@ -58,11 +61,14 @@ const cartReducer = (state, action) => {
// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)
export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }
  const addToCart = (product) => setCart((prev) => [...prev, product]);

  // Add an item to the cart
  const addToCart = (product) => {
@@ -82,6 +88,8 @@ const CartProvider = ({ children }) => {
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }
  const removeFromCart = (id) =>
    setCart((prev) => prev.filter((p) => p.id !== id));

  return (
    <CartContext.Provider
@@ -93,9 +101,11 @@ const CartProvider = ({ children }) => {
        getCartTotal,
      }}
    >
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  )
  );
}

const useCart = () => useContext(CartContext)
export { CartProvider, useCart }