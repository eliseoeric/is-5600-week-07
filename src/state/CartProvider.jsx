// src/state/CartProvider.jsx
import React, { useReducer, useContext } from 'react';

const CartContext = React.createContext();

const initialState = {
  itemsById: {},
  allItems: [],
};

const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';
const CLEAR_CART = 'CLEAR_CART';

const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM: {
      const uuid = payload.id || payload._id;
      const existing = state.itemsById[uuid];
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [uuid]: {
            ...(payload || {}),
            id: uuid,
            quantity: existing ? existing.quantity + 1 : 1,
          },
        },
        allItems: Array.from(new Set([...state.allItems, uuid])),
      };
    }

    case REMOVE_ITEM: {
      const uuid = payload.id || payload._id || payload;
      const items = Object.fromEntries(
        Object.entries(state.itemsById).filter(([key]) => key !== String(uuid))
      );
      return {
        ...state,
        itemsById: items,
        allItems: state.allItems.filter((id) => id !== String(uuid)),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const uuid = payload.id || payload._id || payload.productId;
      const delta = payload.quantity;
      const curr = state.itemsById[uuid];
      if (!curr) return state;
      const newQty = curr.quantity + delta;
      if (newQty <= 0) {
        const items = Object.fromEntries(
          Object.entries(state.itemsById).filter(([key]) => key !== String(uuid))
        );
        return {
          ...state,
          itemsById: items,
          allItems: state.allItems.filter((id) => id !== String(uuid)),
        };
      }
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [uuid]: { ...curr, quantity: newQty },
        },
      };
    }

    case CLEAR_CART: {
      return initialState;
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });

  const removeFromCart = (productId) =>
    dispatch({ type: REMOVE_ITEM, payload: { id: productId, _id: productId } });

  const updateItemQuantity = (productId, quantity) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id: productId, _id: productId, quantity } });

  // NEW: clear the entire cart
  const clearCart = () => dispatch({ type: CLEAR_CART });

  const getCartItems = () => state.allItems.map((uuid) => state.itemsById[uuid]) ?? [];

  const getCartTotal = () =>
    getCartItems().reduce((acc, item) => {
      const price = Number(item.price) || 0;
      return acc + price * (item.quantity || 0);
    }, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal,
        clearCart,             // expose it here
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export { CartProvider };
