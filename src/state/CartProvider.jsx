import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cart: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART": {
      const existingItem = state.cart.find(
        (item) => item._id === action.payload._id
      );

      if (existingItem) {
        return {
          ...state,
          cart: state.cart.map((item) =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
      };
    }

    case "UPDATE_QUANTITY":
      return {
        ...state,
        cart: state.cart.map((item) =>
          item._id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((item) => item._id !== action.payload),
      };

    case "CLEAR_CART":
      return initialState;

    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: "UPDATE_QUANTITY",
      payload: { id, quantity: Number(quantity) },
    });
  };

  const removeFromCart = (id) => {
    dispatch({ type: "REMOVE_FROM_CART", payload: id });
  };

  const clearCart = () => {
    dispatch({ type: "CLEAR_CART" });
  };

  const getCartTotal = () => {
    return state.cart.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cart: state.cart,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        clearCart,
        getCartTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);