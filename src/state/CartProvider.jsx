import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

// Default state
const initialState = {
  itemsById: {},
  allItems: [],
}

// Action types
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

// Reducer function
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
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      }

    case REMOVE_ITEM:
      const updatedItems = { ...state.itemsById }
      delete updatedItems[payload._id]

      return {
        ...state,
        itemsById: updatedItems,
        allItems: state.allItems.filter(id => id !== payload._id),
      }

    case UPDATE_ITEM_QUANTITY:
      if (payload.quantity <= 0) {
        // Optionally remove the item if quantity is zero or less
        const cleanedItems = { ...state.itemsById }
        delete cleanedItems[payload.productId]

        return {
          ...state,
          itemsById: cleanedItems,
          allItems: state.allItems.filter(id => id !== payload.productId),
        }
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.productId]: {
            ...state.itemsById[payload.productId],
            quantity: payload.quantity,
          },
        },
      }

    default:
      return state
  }
}

// Provider component
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { productId, quantity } })
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? []
  }

  const getCartTotal = () => {
    return getCartItems().reduce((total, item) => {
      return total + (item.price * item.quantity)
    }, 0)
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
