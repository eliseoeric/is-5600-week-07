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
      const { [payload._id]: removedItem, ...restItems } = state.itemsById;
      return {
        ...state,
        itemsById: restItems,
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      const currentItem = state.itemsById[payload._id];
      const newQuantity = currentItem.quantity + payload.quantity;
      if (newQuantity <= 0) {
        const { [payload._id]: removedItem, ...restItems } = state.itemsById;
        return {
          ...state,
          itemsById: restItems,
          allItems: state.allItems.filter((itemId) => itemId !== payload._id),
        };
      }
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

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const removeFromCart = (product) => dispatch({ type: REMOVE_ITEM, payload: product });
  const updateItemQuantity = (productId, quantity) => dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });

  const getCartTotal = () => state.allItems.reduce((acc, itemId) => acc + (state.itemsById[itemId].price || 0) * state.itemsById[itemId].quantity, 0);
  const getCartCount = () => state.allItems.reduce((acc, itemId) => acc + state.itemsById[itemId].quantity, 0);
  const getCartItems = () => state.allItems.map((itemId) => state.itemsById[itemId]);

  return (
    <CartContext.Provider value={{ cartItems: getCartItems(), addToCart, removeFromCart, updateItemQuantity, getCartTotal, getCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
