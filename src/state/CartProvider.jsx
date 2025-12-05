import React, { useReducer, useContext } from "react";

// Create Context
const CartContext = React.createContext();

// Initial State
const initialState = {
  itemsById: {},
  allItems: [],
};

// Actions
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

// Reducer
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
      const filteredItems = state.allItems.filter(id => id !== payload._id);
      const updatedItemsById = { ...state.itemsById };
      delete updatedItemsById[payload._id];

      return {
        ...state,
        itemsById: updatedItemsById,
        allItems: filteredItems,
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
      return state;
  }
};

// Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  };

  const getCartItems = () =>
    state.allItems.map((id) => state.itemsById[id]) ?? [];

  const getCartTotal = () => {
    return getCartItems().reduce((sum, item) => {
      return sum + (item.price * item.quantity);
    }, 0);
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

export const useCart = () => useContext(CCartContext);
