import React, { createContext, useReducer, useContext } from "react";

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const existingItem = state.cartItems.find(item => item._id === action.payload._id);
      if (existingItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(item =>
            item._id === action.payload._id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      return { ...state, cartItems: [...state.cartItems, { ...action.payload, quantity: 1 }] };
      
    case "REMOVE_ITEM":
      return { ...state, cartItems: state.cartItems.filter(item => item._id !== action.payload._id) };

    case "UPDATE_ITEM_QUANTITY":
      return {
        ...state,
        cartItems: state.cartItems.map(item =>
          item._id === action.payload._id
            ? { ...item, quantity: Math.max(1, item.quantity + action.payload.change) }
            : item
        ),
      };

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

  const addToCart = product => dispatch({ type: "ADD_ITEM", payload: product });
  const removeFromCart = id => dispatch({ type: "REMOVE_ITEM", payload: { _id: id } });
  const updateItemQuantity = (id, change) => dispatch({ type: "UPDATE_ITEM_QUANTITY", payload: { _id: id, change } });

  const getCartTotal = () => state.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart, updateItemQuantity, getCartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
