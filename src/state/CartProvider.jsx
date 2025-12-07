import React, { useReducer, useContext } from 'react'

// Initialize context
const CartContext = React.createContext()

// Initial state
const initialState = {
  itemsById: {},
  allItems: [],
}

// Actions
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

// Reducer
const cartReducer = (state, action) => {
  const { payload } = action

  switch (action.type) {
    case ADD_ITEM: {
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
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      }
    }

    case REMOVE_ITEM: {
      const { _id } = payload
      const updatedItems = { ...state.itemsById }
      delete updatedItems[_id]

      return {
        ...state,
        itemsById: updatedItems,
        allItems: state.allItems.filter((id) => id !== _id),
      }
    }

    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = payload
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...state.itemsById[id],
            quantity,
          },
        },
      }
    }

    default:
      return state
  }
}

// Provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addItem = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  const removeItem = (_id) => {
    dispatch({ type: REMOVE_ITEM, payload: { _id } })
  }

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } })
  }

  const getCartTotal = () => {
    return state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId]
      return total + item.price * item.quantity
    }, 0)
  }

  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id])
  }

  return (
    <CartContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateItemQuantity,
        getCartTotal,
        getCartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

// Hook
export const useCart = () => useContext(CartContext)

// Export provider
export { CartProvider }
