import React, { useState } from 'react';
import React, { useState, useEffect } from 'react';
import { BASE_URL } from '../config';

const Orders = () => {
@@ -9,7 +9,16 @@ const Orders = () => {
   * 1. Create a `fetchOrders` function that retrieves all orders from the database
   * 2. Using the `useEffect` hook, update the existing `orders` state object when `fetchOrders` is complete
   **/ 

  const fetchOrders=()=>{
    fetch('${BASE_URL}/orders')
    .then((res)=>res.json())
    .then((data)=>{
      setOrders(data);
    })
  }
  useEffect(() =>{
    const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
      console.log({ state, action })
      const newState = {
        ...state,
        itemsById: {
@@ -49,7 +49,19 @@ const cartReducer = (state, action) => {
        ),
      }
      return updatedState

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id];
      const updatedItemState = {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: currentItem.quantity + payload.quantity,
          }
        }
      }
      return updatedItemState
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
    dispatch({type: UPDATE_ITEM_QUANTITY, payload: {_id: productId, quantity}})
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
    return getCartItems().reduce((acc, item)=> acc + item.price*item.quantity, 0);
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
