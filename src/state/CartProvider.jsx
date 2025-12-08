import React, { createContext, useContext, useReducer } from "react";

// Create the context
export const CartContext = createContext();

// Hook to use cart
export const useCart = () => useContext(CartContext);

// Initial State
const initialState = {
  cartItems: []
};

// Reducer function
function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM":
      const exists = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (exists) {
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      } else {
        return {
          ...state,
          cartItems: [
            ...state.cartItems,
            { ...action.payload, quantity: 1 }
          ]
        };
      }

    // REQUIRED BY LAB — update quantity directly
    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case "REMOVE_ITEM":
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.id !== action.payload
        )
      };

    default:
      return state;
  }
}

// Provider wrapper
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Add item
  const addToCart = (product) => {
    dispatch({
      type: "ADD_ITEM",
      payload: product
    });
  };

  // REQUIRED BY LAB — Direct quantity update
  const updateItemQuantity = (id, quantity) => {
    dispatch({
      type: "UPDATE_ITEM_QUANTITY",
      payload: { id, quantity }
    });
  };

  // Remove item
  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_ITEM",
      payload: id
    });
  };

  // REQUIRED BY LAB — Cart total
  const getCartTotal = () => {
    return state.cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems: state.cartItems,
        addToCart,
        updateItemQuantity,
        removeFromCart,
        getCartTotal
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
