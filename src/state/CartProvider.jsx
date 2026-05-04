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

    case REMOVE_ITEM: {
      const updatedItems = { ...state.itemsById };
      delete updatedItems[payload._id];

      return {
        ...state,
        itemsById: updatedItems,
        allItems: state.allItems.filter((id) => id !== payload._id),
      };
    }

    case UPDATE_ITEM_QUANTITY:
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.productId]: {
            ...state.itemsById[payload.productId],
            quantity: payload.quantity,
          },
        },
      };

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const getCartItems = () =>
    state.allItems.map((id) => state.itemsById[id]) ?? [];

  const addToCart = (product) =>
    dispatch({ type: ADD_ITEM, payload: product });

  const removeFromCart = (product) =>
    dispatch({ type: REMOVE_ITEM, payload: product });

  const updateItemQuantity = (productId, quantity) =>
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { productId, quantity: Number(quantity) },
    });

  const clearCart = () => dispatch({ type: CLEAR_CART });

  const getCartTotal = () =>
    getCartItems().reduce(
      (total, item) => total + (item.price || 0) * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export { CartProvider };