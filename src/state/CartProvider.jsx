import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

// Default state
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
      const updatedItems = { ...state.itemsById }
      delete updatedItems[payload._id]

      return {
        ...state,
        itemsById: updatedItems,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      }
    }

    case UPDATE_ITEM_QUANTITY: {
      const { _id, quantity } = payload
      if (!state.itemsById[_id]) return state

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [_id]: {
            ...state.itemsById[_id],
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

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { _id: productId, quantity },
    })
  }

  // ⭐ FINAL CART TOTAL CALCULATION ⭐
  const getCartTotal = () => {
    return Object.values(state.itemsById).reduce((total, item) => {
      return total + item.price * item.quantity
    }, 0)
  }

  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id])
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

export { CartProvider, useCart };
