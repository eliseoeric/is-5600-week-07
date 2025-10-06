import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

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
      return {
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
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      }

    case REMOVE_ITEM:
      return {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key]) => key !== payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      }

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.id]: {
            ...state.itemsById[payload.id],
            quantity: Number(payload.quantity),
          },
        },
      }

    default:
      return state
  }
}

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  // Update the quantity of an item in the cart
  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } })
  }

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    return state.allItems.reduce((sum, itemId) => {
      const item = state.itemsById[itemId]
      return sum + item.price * item.quantity
    }, 0)
  }

  // Get cart items as an array
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? []
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

export { CartProvider, useCart, CartContext }
