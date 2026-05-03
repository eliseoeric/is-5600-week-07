import React, { useReducer, useContext } from 'react'

// Create Context
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
      return {
        ...state,
        itemsById: Object.fromEntries(
          Object.entries(state.itemsById).filter(
            ([key]) => key !== payload._id
          )
        ),
        allItems: state.allItems.filter(id => id !== payload._id),
      }

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.id]: {
            ...state.itemsById[payload.id],
            quantity: payload.quantity,
          },
        },
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

  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id, quantity },
    })
  }

  const getCartTotal = () => {
    return state.allItems.reduce((total, id) => {
      const item = state.itemsById[id]
      return total + (item.price || 0) * item.quantity
    }, 0)
  }

  const getCartItems = () => {
    return state.allItems.map(id => state.itemsById[id])
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