import React, { useReducer, useContext } from 'react'

// Initialize the context
export const CartContext = React.createContext();
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
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      }
      return newState

    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key]) => key !== payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
          allItems: state.allItems.filter((itemId) => itemId !== payload._id),
        }
      return updatedState
      case UPDATE_ITEM_QUANTITY:
        const currentItem = state.itemsById[payload._id]
        if (!currentItem) return state // Prevent updates if item is not found
        const updateItemState = {
          ...state,
          itemsById: {
            ...state.itemsById,
            [payload._id]: {
              ...currentItem,
              quantity: currentItem.quantity + payload.quantity,
            },
          },
        }
        return updateItemState
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
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } })
  }

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0)
  }

  // Get the cart items
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
// Custom hook to use the Cart context
const useCart = () => useContext(CartContext)

export { CartProvider, useCart }
