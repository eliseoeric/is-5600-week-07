import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

// Define the default state
const initialState = {
  itemsById: {}, // Stores items by their _id
  allItems: [],  // Array of all item ids to keep the order
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
      const { _id, description, price } = payload;
      // Check if the item already exists
      const existingItem = state.itemsById[_id];
      if (existingItem) {
        // If item exists, update its quantity
        return {
          ...state,
          itemsById: {
            ...state.itemsById,
            [_id]: {
              ...existingItem,
              quantity: existingItem.quantity + 1,
            }
          },
          allItems: state.allItems, // no need to change this as we only update quantity
        }
      } else {
        // If item doesn't exist, add a new item
        return {
          ...state,
          itemsById: {
            ...state.itemsById,
            [_id]: {
              _id,
              description,
              price,
              quantity: 1, // Set initial quantity to 1
            }
          },
          allItems: [...state.allItems, _id] // Add the _id to the allItems array
        }
      }

    case REMOVE_ITEM:
      // Remove item from itemsById and allItems
      const newItemsById = { ...state.itemsById };
      delete newItemsById[payload._id];

      return {
        ...state,
        itemsById: newItemsById,
        allItems: state.allItems.filter(itemId => itemId !== payload._id),
      }

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id];
      if (currentItem) {
        return {
          ...state,
          itemsById: {
            ...state.itemsById,
            [payload._id]: {
              ...currentItem,
              quantity: currentItem.quantity + payload.quantity
            }
          },
        }
      }
      return state;

    default:
      return state;
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
    const cartItems = getCartItems();
    return cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]);
  }

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        totalItems: getCartItems().reduce((acc, item) => acc + item.quantity, 0),
        removeFromCart,
        addToCart,
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
