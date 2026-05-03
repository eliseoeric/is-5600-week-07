import React, { useReducer, useContext } from 'react';

// Create context
const CartContext = React.createContext();

// Initial state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Action types
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Reducer
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
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
      return newState;
    }

    case REMOVE_ITEM: {
      const updatedItems = Object.entries(state.itemsById)
        .filter(([key]) => key !== payload._id)
        .reduce((obj, [key, value]) => {
          obj[key] = value;
          return obj;
        }, {});

      return {
        ...state,
        itemsById: updatedItems,
        allItems: state.allItems.filter((id) => id !== payload._id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = payload;
      const item = state.itemsById[id];

      if (!item) return state;

      const newQuantity = item.quantity + quantity;

      // remove if 0
      if (newQuantity <= 0) {
        const { [id]: removed, ...remaining } = state.itemsById;

        return {
          itemsById: remaining,
          allItems: state.allItems.filter((itemId) => itemId !== id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...item,
            quantity: newQuantity,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id: productId, quantity },
    });
  };

  const getCartTotal = () => {
    return state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId];
      return total + (item.price || 0) * item.quantity;
    }, 0);
  };

  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id]) || [];
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

// Hook
const useCart = () => useContext(CartContext);

export { CartProvider, useCart };