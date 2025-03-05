import { type } from '@testing-library/user-event/dist/type'
import { STATES } from 'mongoose'
import React, { useReducer, useContext } from 'react'

// Initialize the context
@@ -49,7 +51,22 @@ const cartReducer = (state, action) => {
        ),
      }
      return updatedState


      case UPDATE_ITEM_QUANTITY:
        const currentItem = state,itemsById(payload._id)
        const updateItemState{
          ...state,
          itemsById: {
            ...state.itemsById,
          [payload._id]:
            ...currentItem,
            quantity: currentItem.quantity + payload.quantity,
          },
        }
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

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload:{productId, quantity}})
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
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