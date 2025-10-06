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
      const id = payload._id;
      const nextQty = state.itemsById[id] ? state.itemsById[id].quantity + 1 : 1;
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: { ...payload, quantity: nextQty },
        },
        allItems: Array.from(new Set([...state.allItems, id])),
      };
    }

    case REMOVE_ITEM: {
      const id = payload._id;
      const nextItemsById = { ...state.itemsById };
      delete nextItemsById[id];
      return {
        ...state,
        itemsById: nextItemsById,
        allItems: state.allItems.filter((x) => x !== id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { _id: id, quantity } = payload;
      if (!state.itemsById[id]) return state;

      if (Number(quantity) <= 0) {
        const nextItemsById = { ...state.itemsById };
        delete nextItemsById[id];
        return {
          ...state,
          itemsById: nextItemsById,
          allItems: state.allItems.filter((x) => x !== id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: { ...state.itemsById[id], quantity: Number(quantity) },
        },
        allItems: Array.from(new Set([...state.allItems, id])),
      };
    }

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const removeFromCart = (product) => dispatch({ type: REMOVE_ITEM, payload: product });
  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });
  const updateItemQuantity = (productId, quantity) =>
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });

  const getCartItems = () => state.allItems.map((id) => state.itemsById[id]) ?? [];

  const getCartTotal = () =>
    getCartItems().reduce((acc, item) => acc + Number(item.price || 0) * Number(item.quantity || 0), 0);

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
