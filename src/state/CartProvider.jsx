import React, { useReducer, useContext } from 'react'

// Initialize the context
const CartContext = React.createContext()

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
      };

    case REMOVE_ITEM:
      return {
        ...state,
        itemsById: Object.fromEntries(
          Object.entries(state.itemsById).filter(
            ([key]) => key !== payload._id
          )
        ),
        allItems: state.allItems.filter(id => id !== payload._id),
      };

    // ✅ NEW: update quantity
    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.id]: {
            ...state.itemsById[payload.id],
            quantity: payload.quantity, // direct replacement
          },
        },
      };

    default:
      return state;
  }
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product })
  };

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product })
  };

  // ✅ Update the quantity of an item
  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id: productId, quantity }
    });
  };

  // ✅ Compute the total cost of the cart
  const getCartTotal = () => {
    return Object.values(state.itemsById).reduce((total, item) => {
      return total + item.price * item.quantity;
    }, 0);
  };

  // Helper to return all items in the correct array order
  const getCartItems = () => {
    return state.allItems.map(id => state.itemsById[id]) ?? [];
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
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CCartContext);

export { CartProvider, useCart };
