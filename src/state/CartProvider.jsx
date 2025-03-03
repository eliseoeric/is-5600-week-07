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
      console.log({ newState })
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
    case UPDATE_ITEM_QUANTITY: {
      const { _id, quantity } = payload; // Destructure `_id` and `quantity` from payload

      const currentItem = state.itemsById[_id];
      if (!currentItem) {
        console.warn(`Item with id ${_id} not found in cart.`);
        return state;
      }

      const newQuantity = quantity;

   
      if (newQuantity <= 0) {
        const { [_id]: removed, ...remainingItems } = state.itemsById;
        return {
          ...state,
          itemsById: remainingItems,
          allItems: state.allItems.filter((id) => id !== _id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [_id]: {
            ...currentItem,
            quantity: newQuantity,
          },
        },
      };
    }



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
  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: id, quantity }, })
  }

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    return Object.values(state.itemsById).reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        allItems: state.allItems,
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

export { CartProvider, CartContext }
