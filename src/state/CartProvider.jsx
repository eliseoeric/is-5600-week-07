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

    //ADD ITEM
    case ADD_ITEM: {
      const id = payload._id || payload.id

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...payload,
            quantity: state.itemsById[id]
              ? state.itemsById[id].quantity + 1
              : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, id])),
      }
    }

    //REMOVE ITEM
    case REMOVE_ITEM: {
      const id = payload._id || payload.id

      const newItems = { ...state.itemsById }
      delete newItems[id]

      return {
        ...state,
        itemsById: newItems,
        allItems: state.allItems.filter(itemId => itemId !== id),
      }
    }

    // UPDATE QUANTITY (REQUIRED BY LAB)
    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = payload

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...state.itemsById[id],
            quantity: quantity,
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

  // Add item
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }

  // Remove item
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }

  //Update quantity
  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id: productId, quantity },
    })
  }

  //Get total price
  const getCartTotal = () => {
    return Object.values(state.itemsById).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    )
  }

  // Get cart items array
  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id])
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

// Hook
const useCart = () => useContext(CartContext)

export { CartProvider, useCart }