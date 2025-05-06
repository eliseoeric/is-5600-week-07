import React, { useReducer, useContext } from 'react';

const CartContext = React.createContext();

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
      const existing = state.itemsById[payload._id];
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...payload,
            quantity: existing ? existing.quantity + 1 : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, payload._id])),
      };
    }
    case REMOVE_ITEM: {
      const { _id } = payload;
      const newItemsById = { ...state.itemsById };
      delete newItemsById[_id];
      return {
        ...state,
        itemsById: newItemsById,
        allItems: state.allItems.filter((id) => id !== _id),
      };
    }
    case UPDATE_ITEM_QUANTITY: {
      const { productId, quantity } = payload;
      const existing = state.itemsById[productId];
      if (!existing) return state;

      const newQuantity = existing.quantity + quantity;
      if (newQuantity <= 0) {
        const newItemsById = { ...state.itemsById };
        delete newItemsById[productId];
        return {
          ...state,
          itemsById: newItemsById,
          allItems: state.allItems.filter((id) => id !== productId),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [productId]: {
            ...existing,
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

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { productId, quantity } });
  };

  const getCartItems = () => {
    return state.allItems.map((id) => state.itemsById[id]);
  };

  const getCartTotal = () => {
    return getCartItems().reduce((total, item) => {
      return total + item.price * item.quantity;
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

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
