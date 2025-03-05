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
        allItems: [...state.allItems, payload._id],
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

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: ADD_ITEM, payload: product });

  const getCartItems = () => state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];

  const createOrder = async () => {
    const orderData = {
      items: getCartItems(),
      total: getCartItems().reduce((acc, item) => acc + (item.price || 0) * item.quantity, 0),
    };

    const response = await fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData),
    });

    const newOrder = await response.json();
    console.log('Order created:', newOrder);
  };

  return (
    <CartContext.Provider value={{ cartItems: getCartItems(), addToCart, createOrder }}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
