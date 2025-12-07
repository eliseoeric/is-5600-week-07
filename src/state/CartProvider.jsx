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
    case ADD_ITEM: {
      const existing = state.itemsById[payload._id]
      const quantity = existing ? existing.quantity + 1 : 1

      const newItemsById = {
        ...state.itemsById,
        [payload._id]: {
          ...payload,
          quantity,
        },
      }

      return {
        ...state,
        itemsById: newItemsById,
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      }
    }

    case REMOVE_ITEM: {
      const newItemsById = Object.entries(state.itemsById)
        .filter(([key]) => key !== payload._id)
        .reduce((obj, [key, value]) => {
          obj[key] = value
          return obj
        }, {})

      return {
        ...state,
        itemsById: newItemsById,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      }
    }

    case UPDATE_ITEM_QUANTITY: {
      const { productId, delta } = payload
      const existing = state.itemsById[productId]

      if (!existing) return state

      const newQuantity = existing.quantity + delta

      // If quantity would go to 0 or below, remove the item
      if (newQuantity <= 0) {
        const newItemsById = Object.entries(state.itemsById)
          .filter(([key]) => key !== productId)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {})

        return {
          ...state,
          itemsById: newItemsById,
          allItems: state.allItems.filter((id) => id !== productId),
        }
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [productId]: {
            ...existing,
            quantity: newQuantity,
          },
        },
      }
    }

    default:
      return state
  }
}

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  const updateItemQuantity = (productId, delta) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { productId, delta } })
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? []
  }

  const getCartTotal = () => {
    const items = getCartItems()
    return items.reduce((sum, item) => {
      const price = Number(item.price || 0)
      return sum + price * (item.quantity || 0)
    }, 0)
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
