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
  const { payload } = action
  switch (action.type) {
    case ADD_ITEM:
      const itemId = payload._id
      const existingItem = state.itemsById[itemId]
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [itemId]: {
            ...payload,
            quantity: existingItem ? existingItem.quantity + 1 : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, itemId])),
      }

    case REMOVE_ITEM:
      const updatedItemsById = { ...state.itemsById }
      delete updatedItemsById[payload._id]
      return {
        ...state,
        itemsById: updatedItemsById,
        allItems: state.allItems.filter((id) => id !== payload._id),
      }

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id]
      if (!currentItem) return state // Guard if item not found

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: payload.quantity,
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

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } })
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]).filter(Boolean)
  }

  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0)
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
