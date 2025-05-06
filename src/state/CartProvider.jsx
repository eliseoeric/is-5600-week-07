import React, { createContext, useReducer, useContext } from "react";

const Context = createContext();

const cartHandler = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM": {
      const exists = state.items.find(p => p._id === action.payload._id);
      return exists
        ? {
            ...state,
            items: state.items.map(p =>
              p._id === action.payload._id ? { ...p, quantity: p.quantity + 1 } : p
            )
          }
        : {
            ...state,
            items: [...state.items, { ...action.payload, quantity: 1 }]
          };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(p => p._id !== action.payload)
      };
    case "CHANGE_QTY":
      return {
        ...state,
        items: state.items.map(p =>
          p._id === action.payload.id ? { ...p, quantity: Math.max(1, p.quantity + action.payload.diff) } : p
        )
      };
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartHandler, { items: [] });

  const addItem = product => dispatch({ type: "ADD_ITEM", payload: product });
  const removeItem = id => dispatch({ type: "REMOVE_ITEM", payload: id });
  const changeQty = (id, diff) => dispatch({ type: "CHANGE_QTY", payload: { id, diff } });
  const cartTotal = () => state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Context.Provider value={{ items: state.items, addItem, removeItem, changeQty, cartTotal }}>
      {children}
    </Context.Provider>
  );
};

export const useCart = () => useContext(Context);
