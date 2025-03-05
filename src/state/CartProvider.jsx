import React, { useReducer, useContext } from 'react';

// Initialize the context
const CartContext = React.createContext();

// Define the default state
const initialState = {
  itemsById: {},
  allItems: [],
};

// Define reducer actions
const ADD_ITEM = 'ADD_ITEM';
const REMOVE_ITEM = 'REMOVE_ITEM';
const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

// Define the reducer
const cartReducer = (state, action) => {
  const { payload } = action;

  switch (action.type) {
    case ADD_ITEM:
      if (state.itemsById[payload._id]) {
        return {
          ...state,
          itemsById: {
            ...state.itemsById,
            [payload._id]: {
              ...state.itemsById[payload._id],
              quantity: state.itemsById[payload._id].quantity + 1,
            },
          },
        };
      }
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: { ...payload, quantity: 1 },
        },
        allItems: [...state.allItems, payload._id],
      };

    case REMOVE_ITEM:
      const updatedItemsById = { ...state.itemsById };
      delete updatedItemsById[payload._id];
      return {
        ...state,
        itemsById: updatedItemsById,
        allItems: state.allItems.filter((id) => id !== payload._id),
      };

    case UPDATE_ITEM_QUANTITY:
      const currentItem = state.itemsById[payload._id];
      if (!currentItem) return state; // Prevent updating non-existent item
      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [payload._id]: {
            ...currentItem,
            quantity: Math.max(1, currentItem.quantity + payload.quantity), // Ensure quantity stays at least 1
          },
        },
      };

    default:
      return state;
  }
};

// Define the provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Remove an item from the cart
  const removeFromCart = (productId) => {
    dispatch({ type: REMOVE_ITEM, payload: { _id: productId } });
  };

  // Add an item to the cart
  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  // Update the quantity of an item in the cart
  const updateItemQuantity = (productId, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { _id: productId, quantity } });
  };

  // Get the total price of all items in the cart
  const getCartTotal = () => {
    return getCartItems().reduce((acc, item) => acc + item.price * item.quantity, 0);
  };

  // Get all cart items
  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: getCartItems(),
        addToCart,
        removeFromCart,
        updateItemQuantity,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
