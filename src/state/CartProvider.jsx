import React, { useReducer, useContext } from 'react'

const CartContext = React.createContext()

const initialState = {
  itemsById: {},
  allItems: [],
}

const ADD_ITEM = 'ADD_ITEM'
const REMOVE_ITEM = 'REMOVE_ITEM'
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY'

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
      return {
        ...state,
        itemsById: Object.entries(state.itemsById)
          .filter(([key]) => key !== payload._id)
          .reduce((obj, [key, value]) => {
            obj[key] = value;
            return obj;
          }, {}),
        allItems: state.allItems.filter((itemId) => itemId !== payload._id),
      };
    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload.id];
      if (!currentItem) return state;
      const newQuantity = currentItem.quantity + payload.quantity;
      if (newQuantity <= 0) {
        return {
          ...state,
          itemsById: Object.entries(state.itemsById)
            .filter(([key]) => key !== payload.id)
            .reduce((obj, [key, value]) => {
              obj[key] = value;
              return obj;
            }, {}),
          allItems: state.allItems.filter((itemId) => itemId !== payload.id),
        };
      }
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload.id]: {
            ...currentItem,
            quantity: newQuantity,
          },
        },
      };
    default:
      return state;
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id: productId, quantity } });
  };

  const getCartTotal = () => {
    return state.allItems.reduce((total, itemId) => {
      const item = state.itemsById[itemId];
      return total + (item.price * item.quantity);
    }, 0);
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
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