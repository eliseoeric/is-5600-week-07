@@ -1,54 +1,75 @@
import React, { useReducer, useContext } from 'react'
// Initialize the context
const CartContext = React.createContext()
// Definte the default state
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
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
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
        // Use `Set` to remove all duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
      };
      return newState
    case REMOVE_ITEM:
      const updatedState = {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value
            return obj
          }, {}),
        allItems: state.allItems.filter(
          (itemId) => itemId !== action.payload._id
        ),
      }
      return updatedState

      case UPDATE_ITEM_QUANTITY:
        const currentItem= state.itemsById[payload._id]

        if (!currentItem) {
          console.warn(`Item with ID ${payload._id} not found. Cannot update quantity.`);
          return state;
        }

        const updateItemState = {
          ...state,
          itemsById:{
          ...state.itemsById,
          [payload._id]:{
            ...currentItem,
            quantity: currentItem.quantity + payload.quantity,
          },
        }
        }

        return updateItemState

    default:
      return state
@@ -71,13 +92,13 @@ const CartProvider = ({ children }) => {

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
    dispatch({type: UPDATE_ITEM_QUANTITY,payload:{id:productId,quantity}})
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }
  const getCartTotal = () => 
    getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);


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