import React, { useReducer, useContext } from 'react'
// CartProvider.js
import React, { useReducer, useContext } from 'react';

// Initialize the context
const CartContext = React.createContext()
const CartContext = React.createContext();

// Definte the default state
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
@@ -21,6 +28,7 @@ const cartReducer = (state, action) => {
    case ADD_ITEM:
      console.log({state, action})
      const newState = {
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
@@ -29,14 +37,19 @@ const cartReducer = (state, action) => {
            quantity: state.itemsById[payload._id]
              ? state.itemsById[payload._id].quantity + 1
              : 1,
            quantity: state.itemsById[payload._id] ? state.itemsById[payload._id].quantity + 1 : 1,
          },
        },
        // Use `Set` to remove all duplicates
        allItems: Array.from(new Set([...state.allItems, action.payload._id])),
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
      return newState
    case REMOVE_ITEM:
      const updatedState = {
      const updatedItemsById = { ...state.itemsById };
      delete updatedItemsById[payload._id];
      return {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key, value]) => key !== action.payload._id)
@@ -49,11 +62,27 @@ const cartReducer = (state, action) => {
        ),
      }
      return updatedState


        itemsById: updatedItemsById,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      };
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
      };
    default:
      return state
      return state;
  }
}
};

// Define the provider
const CartProvider = ({ children }) => {
@@ -63,41 +92,54 @@ const CartProvider = ({ children }) => {
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

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // todo Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    // todo
  }
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id: productId, quantity } });
  };

  // todo Get the total price of all items in the cart
  const getCartTotal = () => {
    // todo
  }
    return state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId];
      return total + item.price * item.quantity;
    }, 0);
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
      }}
@@ -95,9 +89,9 @@ const CartProvider = ({ children }) => {
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
export { CartProvider, useCart }
export { CartProvider, useCart };