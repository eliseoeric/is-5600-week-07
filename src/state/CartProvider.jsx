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
        // Use `Set` to remove duplicates
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
      return newState;
    }

    case REMOVE_ITEM: {
      const itemsById = Object.entries(state.itemsById)
        .filter(([key]) => key !== payload._id)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      return {
        ...state,
        itemsById,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = payload;
      const existingItem = state.itemsById[id];
      if (!existingItem) return state;

      // Make sure quantity is at least 1
      const newQuantity = Math.max(quantity, 1);

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...existingItem,
            quantity: newQuantity,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Remove an item from the cart
  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Update the quantity of an item in the cart (set, not add)
  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    const items = getCartItems();
    return items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
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

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };