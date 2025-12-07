import React, { createContext, useContext, useReducer } from "react";

const CartContext = createContext();

const initialState = {
  cartItems: [],
};

function cartReducer(state, action) {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.cartItems.find(i => i._id === action.payload._id);
      if (existing) {
        return {
          ...state,
          cartItems: state.cartItems.map(i =>
            i._id === action.payload._id ? { ...i, quantity: i.quantity + 1 } : i
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
    }
    case "UPDATE_ITEM_QUANTITY": {
      return {
        ...state,
        cartItems: state.cartItems.map(i =>
          i._id === action.payload.id ? { ...i, quantity: action.payload.quantity } : i
        ),
      };
    }
    case "REMOVE_ITEM": {
      return {
        ...state,
        cartItems: state.cartItems.filter(i => i._id !== action.payload.id),
      };
    }
    default:
      return state;
  }
}

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => dispatch({ type: "ADD_ITEM", payload: product });
  const updateItemQuantity = (id, quantity) =>
    dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { id, quantity } });
  const removeFromCart = (id) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });
  const getCartTotal = () =>
    state.cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{ ...state, addToCart, updateItemQuantity, removeFromCart, getCartTotal }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
export { CartContext };
