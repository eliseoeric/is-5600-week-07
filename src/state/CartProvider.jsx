import React, { createContext, useContext, useReducer } from "react";

export const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_ITEM_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    }

    case "REMOVE_ITEM": {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        ),
      };
    }

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) =>
    dispatch({ type: "ADD_ITEM", payload: product });

  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id, quantity } });

  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: id });

  const getCartTotal = () =>
    state.cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
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

export const useCart = () => useContext(CartContext);
