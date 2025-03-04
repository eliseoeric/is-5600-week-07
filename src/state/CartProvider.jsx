import React, { useReducer, useContext } from 'react';

// Initialize the context
const CartContext = React.createContext();

// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM: {
      console.log({ state, action });

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
      };

      return newState;
    }

    case REMOVE_ITEM: {
      const { _id } = payload;
      const { [ _id ]: removedItem, ...remainingItems } = state.itemsById;

      return {
        ...state,
        itemsById: remainingItems,
        allItems: state.allItems.filter((itemId) => itemId !== _id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const currentItem = state.itemsById[payload._id];

      if (!currentItem) return state; // Ensure item exists before updating

      const newQuantity = Math.max(1, currentItem.quantity + payload.quantity); // Prevent negative values

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: newQuantity,
          },
        },
      };
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item to cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Remove item from cart
  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_ITEM, payload: { _id: productId } });
  };

  // Update item quantity
  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });
  };

  // Get total price of all items in the cart
  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  // Get cart items
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  };

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
  );
};

// Custom hook to use cart context
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
