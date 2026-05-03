import React, {
  createContext,
  useReducer,
  useContext
} from 'react'

const CartContext = createContext()

const cartReducer = (state, action) => {
  switch (action.type) {

    case 'ADD_ITEM':
      const existingItem = state.cartItems.find(
        (item) => item.id === action.payload.id
      )

      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? {
                  ...item,
                  quantity: item.quantity + 1
                }
              : item
          )
        }
      }

      return {
        ...state,
        cartItems: [
          ...state.cartItems,
          {
            ...action.payload,
            quantity: 1
          }
        ]
      }

    case 'REMOVE_ITEM':
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        )
      }

    case 'UPDATE_ITEM_QUANTITY':
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? {
                ...item,
                quantity: action.payload.quantity
              }
            : item
        )
      }

    default:
      return state
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    cartItems: []
  })

  const addToCart = (product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: product
    })
  }

  const removeFromCart = (id) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: id
    })
  }

  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: 'UPDATE_ITEM_QUANTITY',
      payload: {
        id,
        quantity
      }
    })
  }

  const getCartTotal = () => {
    return state.cartItems.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    )
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)

export default CartContext
