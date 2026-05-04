import React, { useReducer, useContext } from 'react'
// Initialize the context
const CartContext = React.createContext()

// Definte the default state
// Define the default state
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
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
      return newState

    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
          .filter(([key]) => key !== payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
          (itemId) => itemId !== payload._id
        ),
      }
      return updatedState


    // Task 1: Implement UPDATE_ITEM_QUANTITY in the reducer
    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.productId]: {
            ...state.itemsById[payload.productId],
            quantity: payload.quantity
          }
        }
      }

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
  // Task 2: Implement the dispatch for updateItemQuantity
  const updateItemQuantity = (productId, quantity) => {
    // todo
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { productId, quantity } })
  }

  // todo Get the total price of all items in the cart
  // Task 3: Implement getCartTotal using the state
  const getCartTotal = () => {
    // todo
    return state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId];
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
export { CartProvider, useCart, CartContext }