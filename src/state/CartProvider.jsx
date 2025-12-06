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
      const id = payload._id || payload.id;

      const existing = state.itemsById[id];
      const newQuantity = existing ? existing.quantity + 1 : 1;

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...payload,
            quantity: newQuantity,
          },
        },
        allItems: state.allItems.includes(id)
          ? state.allItems
          : [...state.allItems, id],
      };
    }

    case REMOVE_ITEM: {
      const id = payload._id || payload.id;
      const { [id]: _, ...restItems } = state.itemsById;
      return {
        ...state,
        itemsById: restItems,
        allItems: state.allItems.filter((itemId) => itemId !== id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = payload;

      if (quantity <= 0) {
        const { [id]: _, ...rest } = state.itemsById;
        return {
          ...state,
          itemsById: rest,
          allItems: state.allItems.filter((itemId) => itemId !== id),
        };
      }

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...state.itemsById[id],
            quantity,
          },
        },
      };
    }

    case CLEAR_CART:
      return initialState;

    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: ADD_ITEM, payload: product });

  const removeFromCart = (product) =>
    dispatch({ type: REMOVE_ITEM, payload: product });

  const updateItemQuantity = (id, quantity) =>
    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id, quantity: Number(quantity) },
    });

  const getCartTotal = () =>
    state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId];
      if (!item) return total;
      return total + Number(item.price) * Number(item.quantity);
    }, 0);

  const getCartItems = () =>
    state.allItems.map((itemId) => state.itemsById[itemId]);

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
