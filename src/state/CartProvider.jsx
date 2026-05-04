// src/state/CartProvider.jsx

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
      
    case UPDATE_ITEM_QUANTITY:
      // NEW: Update quantity directly - if quantity <= 0, remove the item
      if (payload.quantity <= 0) {
        // Remove item if quantity becomes 0 or negative
        const updatedState = {
          ...state,
          itemsById: Object.entries(state.itemsById)
            .filter(([key, value]) => key !== payload._id)
            .reduce((obj, [key, value]) => {
              obj[key] = value
              return obj
            }, {}),
          allItems: state.allItems.filter(
            (itemId) => itemId !== payload._id
          ),
        }
        return updatedState
      }
      
      // Otherwise, update the quantity directly (not add to it)
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...state.itemsById[payload._id],
            quantity: payload.quantity, // Set directly, not increment
          },
        },
      }
      
    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== payload._id
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

  // Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // Dispatch the UPDATE_ITEM_QUANTITY action with the productId and new quantity
    dispatch({ 
      type: UPDATE_ITEM_QUANTITY, 
      payload: { _id: productId, quantity: quantity } 
    })
  }

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    // Use reduce to sum up price * quantity for all items
    const items = getCartItems();
    return items.reduce((total, item) => {
      return total + (item.price * item.quantity);
    }, 0);
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