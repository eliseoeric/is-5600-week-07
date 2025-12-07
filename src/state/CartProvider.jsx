import React, { useReducer, createContext, useContext } from 'react';

const CartContext = createContext();

const initialState = {
  itemsById: {},
  allItems: [],
};

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM: {
      const existingItem = state.itemsById[payload._id];

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload,
            quantity: existingItem ? existingItem.quantity + 1 : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
    }

    case REMOVE_ITEM: {
      const { [payload._id]: _, ...remaining } = state.itemsById;

      return {
        ...state,
        itemsById: remaining,
        allItems: state.allItems.filter((id) => id !== payload._id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const item = state.itemsById[payload._id];
      const newQty = item.quantity + payload.quantity;

      if (newQty <= 0) {
        const { [payload._id]: _, ...remaining } = state.itemsById;

        return {
          ...state,
          itemsById: remaining,
          allItems: state.allItems.filter((id) => id !== payload._id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: { ...item, quantity: newQty },
        },
      };
    }

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const removeFromCart = (product) => dispatch({ type: REMOVE_ITEM, payload: product });
  const updateItemQuantity = (id, qty) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: id, quantity: qty } });

  const getCartItems = () => state.allItems.map((id) => state.itemsById[id]);
  const getCartCount = () =>
    state.allItems.reduce((sum, id) => sum + state.itemsById[id].quantity, 0);
  const getCartTotal = () =>
    state.allItems.reduce(
      (sum, id) => sum + state.itemsById[id].price * state.itemsById[id].quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{ cartItems: getCartItems(), addToCart, removeFromCart, updateItemQuantity, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CCartContext);
