// src/state/CartProvider.jsx
import React, { useReducer, useContext } from "react";

// Context
const CartContext = React.createContext();

// Default state
const initialState = {
  itemsById: {},  
  allItems: [],   
};

// Actions
const ADD_ITEM = "ADD_ITEM";
const REMOVE_ITEM = "REMOVE_ITEM";
const UPDATE_ITEM_QUANTITY = "UPDATE_ITEM_QUANTITY";

// Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case ADD_ITEM: {
      const product = action.payload;
      const id = product.id;   // ⭐ FIXED – use product.id
      const existing = state.itemsById[id];

      const price = product.price ?? 5;

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...product,
            price,
            quantity: existing ? existing.quantity + 1 : 1,
          },
        },
        allItems: existing ? state.allItems : [...state.allItems, id],
      };
    }

    case REMOVE_ITEM: {
      const id = action.payload.id; // ⭐ FIXED
      const { [id]: removed, ...rest } = state.itemsById;

      return {
        ...state,
        itemsById: rest,
        allItems: state.allItems.filter((itemId) => itemId !== id),
      };
    }

    case UPDATE_ITEM_QUANTITY: {
      const { id, quantity } = action.payload; // ⭐ FIXED
      const existing = state.itemsById[id];

      if (!existing) return state;

      const safeQty = quantity < 1 ? 1 : quantity;

      return {
        ...state,
        itemsById: {
          ...state.itemsById,
          [id]: {
            ...existing,
            quantity: safeQty,
          },
        },
      };
    }

    default:
      return state;
  }
};

// Provider
const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: ADD_ITEM, payload: product });
  };

  const removeFromCart = (product) => {
    dispatch({ type: REMOVE_ITEM, payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({ type: UPDATE_ITEM_QUANTITY, payload: { id, quantity } });
  };

  const getCartItems = () => {
    return state.allItems.map((itemId) => state.itemsById[itemId]) ?? [];
  };

  const getCartTotal = () => {
    return getCartItems().reduce((sum, item) => {
      const price = item.price ?? 5;
      return sum + price * item.quantity;
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
