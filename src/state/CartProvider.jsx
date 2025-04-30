import React, { useReducer, useContext } from 'react'
import React, { useReducer, useContext } from 'react';

// Initialize the context
const CartContext = React.createContext()
const CartContext = React.createContext();

// Definte the default state
// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
}
};

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case ADD_ITEM:
      console.log({state, action})
      const newState = {
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
@@ -31,57 +30,59 @@ const cartReducer = (state, action) => {
              : 1,
          },
        },
        // Use `Set` to remove all duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
      return newState

    case REMOVE_ITEM:
      const updatedState = {
      const { [payload._id]: removedItem, ...restItems } = state.itemsById;
      return {
        ...state,
        itemsById: restItems,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      };

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id];
      if (!currentItem) return state;
      return {
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

        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: Math.max(1, currentItem.quantity + payload.quantity),
          },
        },
      };

    default:
      return state
      return state;
  }
}
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState)

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  }
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  }
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
  }
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }
  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }
  };

  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider
@@ -95,9 +96,9 @@ const CartProvider = ({ children }) => {
    >
      {children}
    </CartContext.Provider>
  )
}
  );
};

const useCart = () => useContext(CartContext)
const useCart = () => useContext(CartContext);

export { CartProvider, useCart }
export { CartProvider, useCart };